// Kyc.jsx
import React, { useState, useRef } from 'react';
import { UploadCloud, X, UserCheck, FileText } from 'lucide-react';
import { submitKyc } from '../services/apiService';
import { useAuthContext } from '../context/AuthContext';
o
// Reusable Image Uploader
const ImageUploader = ({ title, uploadedImage, setUploadedImage }) => {
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage({
        preview: URL.createObjectURL(file),
        file,
      });
    }
  };




  const handleRemoveImage = () => {
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
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </div>
      )}
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

  // Placeholder: Use actual user ID from context/auth
  // const user_id = 3081;
  const { user } = useAuthContext();
  // If backend requires image as base64 or URL, process accordingly.
  // This example sends empty strings but you can convert file to base64 if required.

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // base64 string without prefix
      reader.onerror = error => reject(error);
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Add validation
    if (!aadhar_card || !panNum) {
        setErrors({
            adhar_card: !aadhar_card ? "Aadhar number is required" : "",
            pancard: !panNum ? "PAN number is required" : ""
        });
        setLoading(false);
        return;
    }

    try {
        const aadhaar_front_base64 = aadharFront?.file ? await fileToBase64(aadharFront.file) : "";
        const aadhaar_back_base64 = aadharBack?.file ? await fileToBase64(aadharBack.file) : "";
        const pan_front_base64 = panImage?.file ? await fileToBase64(panImage.file) : "";

        // Match the exact API parameter names
        const kycData = {
            user_id: user.user_id,
            adhar_card: aadhar_card,      // This matches the API parameter
            aadhaar_front: aadhaar_front_base64,
            aadhaar_back: aadhaar_back_base64,
            pancard: panNum,              // This matches the API parameter
            pan_front: pan_front_base64
        };

        console.log("Sending KYC data:", kycData); // Debug log

        const res = await submitKyc(kycData);
        console.log("KYC Response:", res); // Debug log
        
        if (res.success) {
            toast.success("KYC Submitted Successfully!");
        } else {
            toast.error(res.message || "KYC Submission Failed");
        }
    } catch (error) {
        console.error("KYC Error:", error); // Debug log
        if (error.response) {
            const errorMessage = error.response.data.message || "KYC Submission Failed";
            toast.error(errorMessage);
            setErrors(error.response.data.errors || {});
        } else {
            toast.error("Network Error. Please try again.");
        }
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
                onChange={(e) => setAadharCard(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter Aadhaar Number"
                required
              />
              {errors.adhar_card && <p className="text-red-500 text-xs mt-1">{errors.adhar_card}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUploader title="Upload Aadhaar Front Image" uploadedImage={aadharFront} setUploadedImage={setAadharFront} />
              <ImageUploader title="Upload Aadhaar Back Image" uploadedImage={aadharBack} setUploadedImage={setAadharBack} />
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
                onChange={(e) => setPanNum(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter PAN Number"
                required
              />
              {errors.pancard && <p className="text-red-500 text-xs mt-1">{errors.pancard}</p>}
            </div>
            <div className='max-w-[50%]'>
              <ImageUploader title="Upload PAN Image" uploadedImage={panImage} setUploadedImage={setPanImage} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
          >
            {loading ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Kyc;
