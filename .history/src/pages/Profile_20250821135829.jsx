import React, { useState, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'; // NavLink import karein
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../context/AuthContext';
import {
  Camera, Banknote, Users, Info, FileText,
  ShieldCheck, LogOut, ChevronRight, Handshake, KeyRound
} from 'lucide-react';


// const initialUserData = {
//   name: 'Future Code',
//   email: 'admin@gmail.com',
//   loginId: '111',
//   mobile: '7705015444',
//   wallet: '879,705,999.99',
//   profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
// };

// Reusable component for profile action links using NavLink
const ProfileLink = ({ icon: Icon, text, path }) => (
  <NavLink to={path} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group">
    <div className="flex items-center space-x-4">
      <div className="bg-gray-200 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
        <Icon className="text-gray-600 group-hover:text-blue-600" size={20} />
      </div>
      <span className="font-medium text-gray-700">{text}</span>
    </div>
    <ChevronRight className="text-gray-400 group-hover:text-gray-600" size={20} />
  </NavLink>
);

// Main Profile Component
function UserProfile() {
  const { logout, user } = useAuthContext();
  const [userData, setUserData] = useState(user);
  const [newImageFile, setNewImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(user.photo);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out successfully.");
    navigate('/login');
  };



  const handleImageUpdateClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    if (newImageFile) {
      const newImageUrl = profileImage;
      setUserData(prev => ({ ...prev, profileImage: newImageUrl }));
    }
    toast.success('Profile updated successfully!');
  };

  // actionLinks array me 'path' property add karein
  const actionLinks = [
    { icon: Banknote, text: "Bank Details", path: "/profile/bank-details" },
    { icon: Users, text: "Team", path: "/profile/team" },
    { icon: Info, text: "About Us", path: "/about" },
    { icon: FileText, text: "T&C", path: "/terms" },
    { icon: Handshake, text: "Support", path: "/support" },
    { icon: ShieldCheck, text: "KYC", path: "/kyc" },
    { icon: KeyRound, text: "Privacy Policy", path: "/privacy" },
    // { icon: LogOut, text: "Logout", path: "/login" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
          <div className="relative inline-block group mb-4">
            <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
            <button onClick={handleImageUpdateClick} className="absolute inset-0 w-full h-full bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera size={32} className="text-white" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>

        {/* User Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><p className="text-sm text-gray-500">Login ID</p><p className="text-lg font-bold text-gray-800">{userData.user_id}</p></div>
            <div><p className="text-sm text-gray-500">Mobile No.</p><p className="text-lg font-bold text-gray-800">{userData.phone}</p></div>
            <div><p className="text-sm text-gray-500">Wallet Balance</p><p className="text-lg font-bold text-green-600">₹{userData.wallet}</p></div>
          </div>
        </div>

        {/* Action Links Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actionLinks.map((link) => (
              <ProfileLink key={link.text} icon={link.icon} text={link.text} path={link.path} />
            ))}

            {/* Custom Logout Action */}
            <div onClick={handleLogout} className="flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-red-200 p-2 rounded-lg">
                  <LogOut className="text-red-600" size={20} />
                </div>
                <span className="font-medium text-red-700">Logout</span>
              </div>
              <ChevronRight className="text-red-400" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Outlet />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSaveChanges} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
