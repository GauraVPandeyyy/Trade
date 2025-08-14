import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify'; // Toaster ke liye import
import 'react-toastify/dist/ReactToastify.css'; // Toaster styles

import {
  Camera,
  Banknote,
  Users,
  Info,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Handshake,
  KeyRound
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Sample data, aap isse API se la sakte hain
const initialUserData = {
  name: 'Future Code',
  email: 'admin@gmail.com',
  loginId: '111',
  mobile: '7705015444',
  wallet: '879,705,999.99',
  profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' // Default image
};

// Reusable component for profile action links
const ProfileLink = ({ icon: Icon, text, href = "#" }) => (
  <div  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group">
    <div className="flex items-center space-x-4">
      <div className="bg-gray-200 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
        <Icon className="text-gray-600 group-hover:text-blue-600" size={20} />
      </div>
      <span className="font-medium text-gray-700">{text}</span>
    </div>
    <ChevronRight className="text-gray-400 group-hover:text-gray-600" size={20} />
  </div>
);

// Main Profile Component
function UserProfile() {
  const [userData, setUserData] = useState(initialUserData);
  const [profileImage, setProfileImage] = useState(initialUserData.profileImage);
  const [newImageFile, setNewImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpdateClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFile(file);
      setProfileImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSaveChanges = () => {
    // Yahan API call karke data aur image save karne ka logic aayega.
    // Abhi ke liye, hum sirf state update aur toast show kar rahe hain.
    if (newImageFile) {
      // Assuming the image is uploaded and a new URL is returned
      const newImageUrl = profileImage; // Using the preview URL for simulation
      setUserData(prev => ({ ...prev, profileImage: newImageUrl }));
    }
    
    console.log("Saving changes...", { userData, newImageFile });
    
    toast.success('Profile updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const actionLinks = [
    { icon: Banknote, text: "Bank Details" path },
    { icon: Users, text: "Team" },
    { icon: Info, text: "About Us" },
    { icon: FileText, text: "T&C" },
    { icon: Handshake, text: "Support" },
    { icon: ShieldCheck, text: "KYC" },
    { icon: KeyRound, text: "Privacy Policy" },
    { icon: LogOut, text: "Logout" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
          
          {/* Profile Picture Section */}
          <div className="relative inline-block group mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button
              onClick={handleImageUpdateClick}
              className="absolute inset-0 w-full h-full bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Camera size={32} className="text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>

        {/* User Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Login ID</p>
                <p className="text-lg font-bold text-gray-800">{userData.loginId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile No.</p>
                <p className="text-lg font-bold text-gray-800">{userData.mobile}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Wallet Balance</p>
                <p className="text-lg font-bold text-green-600">₹{userData.wallet}</p>
              </div>
           </div>
        </div>
        
        {/* Action Links Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actionLinks.map((link) => (
                <ProfileLink key={link.text} icon={link.icon} text={link.text} />
              ))}
            </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
