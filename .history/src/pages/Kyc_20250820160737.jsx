import React, { useState, useRef } from 'react';
import { UploadCloud, X, UserCheck, FileText } from 'lucide-react';

// Reusable Image Uploader Component
const ImageUploader = ({ title, uploadedImage, setUploadedImage }) => {
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
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
          <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
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

// Main KYC Component
function Kyc() {
dhar_card] = useState('');
  const [panNum, setPanName] = useState('');
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan form submission ka logic aayega
    console.log({
      aadharName,
      panName,
      aadharFront,
      aadharBack,
      panImage
    });
    alert("KYC Submitted! Check console for data.");
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
          {/* Aadhar Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-700">Aadhar Card Details</h2>
            </div>
            <div>
              <label htmlFor="aadharName" className="block text-sm font-medium text-gray-600 mb-1">Aadhar Name*</label>
              <input
                id="aadharName"
                type="text"
                value={aadharName}
                onChange={(e) => setAadharName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter name as on Aadhar card"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUploader title="Upload Aadhar Front Image" uploadedImage={aadharFront} setUploadedImage={setAadharFront} />
              <ImageUploader title="Upload Aadhar Back Image" uploadedImage={aadharBack} setUploadedImage={setAadharBack} />
            </div>
          </div>

          {/* PAN Section */}
          <div className="space-y-6">
             <div className="flex items-center space-x-3">
              <FileText className="text-indigo-500" />
              <h2 className="text-xl font-semibold text-gray-700">PAN Card Details</h2>
            </div>
            <div>
              <label htmlFor="panName" className="block text-sm font-medium text-gray-600 mb-1">PAN Name*</label>
              <input
                id="panName"
                type="text"
                value={panName}
                onChange={(e) => setPanName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter name as on PAN card"
                required
              />
            </div>
            <div className='max-w-[50%]'>
              <ImageUploader title="Upload PAN Image" uploadedImage={panImage} setUploadedImage={setPanImage} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
          >
            Submit KYC
          </button>
        </form>
      </div>
    </div>
  );
}

export default Kyc;
