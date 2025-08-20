// Kyc.jsx
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, UserCheck, FileText } from 'lucide-react';
import { submitKyc } from '../services/apiService';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

// Reusable Image Uploader
const ImageUploader = ({ title, uploadedImage, setUploadedImage, error }) => {
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      setUploadedImage({
        preview: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleRemoveImage = () => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-500 mb-2">{title}</label>
      {uploadedImage ? (
        <div className="relative group w-full h-40 rounded-xl overflow-hidden shadow-inner">
          <img src={uploadedImage.preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 cursor-pointer bg-gray-50"
        >
          <UploadCloud size={32} className="mb-2" />
          <p className="text-sm font-semibold">Click to upload</p>
          <p className="text-xs mt-1">Max 2MB</p>
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

function Kyc() {
  const [aadhar_card, setAadharCard] = useState('');
  const [panNum, setPanNum] = useState('');
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      [aadharFront, aadharBack, panImage].forEach(image => {
        if (image?.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [aadharFront, aadharBack, panImage]);

  const validateAadhar = (aadhar) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar.replace(/\s/g, ''));
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        reject(new Error("File must be an image"));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        // Verify it's a proper data URL
        if (typeof result === 'string' && result.startsWith('data:image/')) {
          resolve(result);
        } else {
          reject(new Error("Failed to convert file to proper base64 format"));
        }
      };
      reader.onerror = (error) => reject(new Error("Failed to read file"));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = {};

    // Validate required fields
    if (!aadhar_card) newErrors.adhar_card = "Aadhaar number is required";
    if (!panNum) newErrors.pancard = "PAN number is required";
    if (!aadharFront?.file) newErrors.aadharFront = "Aadhaar front image is required";
    if (!aadharBack?.file) newErrors.aadharBack = "Aadhaar back image is required";
    if (!panImage?.file) newErrors.panImage = "PAN image is required";

    // Validate formats
    if (aadhar_card && !validateAadhar(aadhar_card)) {
      newErrors.adhar_card = "Invalid Aadhaar number format (12 digits required)";
    }

    if (panNum && !validatePAN(panNum)) {
      newErrors.pancard = "Invalid PAN number format (e.g., ABCDE1234F)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      toast.error("Please fix the errors below");
      return;
    }

    try {
      // Convert images to base64 with proper error handling
      const [aadhaar_front_base64, aadhaar_back_base64, pan_front_base64] = await Promise.all([
        fileToBase64(aadharFront.file),
        fileToBase64(aadharBack.file),
        fileToBase64(panImage.file)
      ]);

      // Debug: Check base64 format
      console.log("Base64 format check:", {
        frontStartsWith: aadhaar_front_base64?.substring(0, 20),
        backStartsWith: aadhaar_back_base64?.substring(0, 20),
        panStartsWith: pan_front_base64?.substring(0, 20)
      });

      // TRY BOTH FORMATS - COMMENT/UNCOMMENT THE OPTION THAT WORKS
      const kycData = {
        user_id: user.user_id,
        adhar_card: aadhar_card.replace(/[^0-9]/g, ''),
        pancard: panNum.toUpperCase(),
        
        // OPTION 1: Full data URL (with prefix) - data:image/jpeg;base64,...
        aadhaar_front: aadhaar_front_base64,
        aadhaar_back: aadhaar_back_base64,
        pan_front: pan_front_base64,
        
        // OPTION 2: Only base64 data (without prefix) - remove the data:image/... part
      //   aadhaar_front: aadhaar_front_base64.split(',')[1],
      //   aadhaar_back: aadhaar_back_base64.split(',')[1],
      //   pan_front: pan_front_base64.split(',')[1],
      // };

      console.log("Submitting KYC data...", {
        ...kycData,
        aadhaar_front: kycData.aadhaar_front?.substring(0, 50) + '...',
        aadhaar_back: kycData.aadhaar_back?.substring(0, 50) + '...',
        pan_front: kycData.pan_front?.substring(0, 50) + '...'
      });

      const response = await submitKyc(kycData);

      if (response.success) {
        toast.success("KYC submitted successfully!");
        // Reset form
        setAadharCard('');
        setPanNum('');
        setAadharFront(null);
        setAadharBack(null);
        setPanImage(null);
      }

    } catch (error) {
      console.error("KYC submission error:", error);
      
      // Handle API validation errors
      if (error.errors) {
        setErrors(error.errors);
      }
      
      toast.error(error.message || "Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full mb-4">
            <UserCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">KYC Verification</h1>
          <p className="text-gray-500 mt-2">Please fill in your details and upload the required documents.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Aadhaar Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-700">Aadhaar Card Details</h2>
            </div>
            <div>
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-600 mb-1">Aadhaar Number*</label>
              <input
                id="aadharNumber"
                type="text"
                value={aadhar_card}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 12) {
                    setAadharCard(value);
                  }
                }}
                className={`w-full px-4 py-3 border ${errors.adhar_card ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter 12 digit Aadhaar Number"
                required
                maxLength="12"
              />
              {errors.adhar_card && <p className="text-red-500 text-xs mt-1">{errors.adhar_card}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUploader 
                title="Upload Aadhaar Front Image*" 
                uploadedImage={aadharFront} 
                setUploadedImage={setAadharFront} 
                error={errors.aadharFront}
              />
              <ImageUploader 
                title="Upload Aadhaar Back Image*" 
                uploadedImage={aadharBack} 
                setUploadedImage={setAadharBack} 
                error={errors.aadharBack}
              />
            </div>
          </div>

          {/* PAN Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FileText className="text-indigo-500" />
              <h2 className="text-xl font-semibold text-gray-700">PAN Card Details</h2>
            </div>
            <div>
              <label htmlFor="panNum" className="block text-sm font-medium text-gray-600 mb-1">PAN Number*</label>
              <input
                id="panNum"
                type="text"
                value={panNum}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                  if (value.length <= 10) {
                    setPanNum(value);
                  }
                }}
                className={`w-full px-4 py-3 border ${errors.pancard ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                placeholder="Enter 10 character PAN Number (e.g., ABCDE1234F)"
                required
                maxLength="10"
              />
              {errors.pancard && <p className="text-red-500 text-xs mt-1">{errors.pancard}</p>}
            </div>
            <div className='max-w-[50%]'>
              <ImageUploader 
                title="Upload PAN Image*" 
                uploadedImage={panImage} 
                setUploadedImage={setPanImage} 
                error={errors.panImage}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Kyc;