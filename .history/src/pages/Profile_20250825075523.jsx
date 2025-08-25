import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../context/AuthContext';
import {
  Camera, Banknote, Users, Info, FileText,
  ShieldCheck, LogOut, ChevronRight, Handshake, KeyRound,
  Edit3, Save, X
} from 'lucide-react';
import { updateUserProfile, getUser } from '../services/apiService';

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
  const { logout, user, updateUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    phone: null,
    photo: null,
    email: null,
    wallet: null

  });
  const [updateName, setUpdateName] = useState(userData.name);
  const [tempImage, setTempImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await getUser(user.user_id);  // id nahi user_id bhejna hai
      if (response?.status) {
        setUserData({
          name: response.data.name || "",
          phone: response.data.phone || "",
          photo: response.data.photo || "",
          email: response.data.email || "",
          wallet: response.data.wallet || 0
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleLogout = () => {
    logout();
    toast.info("You have been logged out successfully.");
    navigate('/login');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset temp image when canceling edit
    if (isEditing) {
      setTempImage(null);
    }
  };

  const handleImageUpdateClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage({
          file: file,
          preview: URL.createObjectURL(file),
          base64: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData(prev => ({ ...prev, [name]: value }));
  // };

  const handleSaveChanges = async () => {
    if (!userData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsLoading(true);

    try {
      const updateData = {
        user_id: user.user_id,
        name: userData.name !== "" ? userData.name : "",   // agar empty hai toh blank
        photo: tempImage ? tempImage.base64 : ""           // agar update ni kiya toh blank
      };

      const response = await updateUserProfile(updateData);

      if (response.status) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setTempImage(null);
        fetchUserData(); // update ke baad latest data reload
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  // Get the current profile image for display
  const getProfileImage = () => {
    if (tempImage) return tempImage.preview;
    return userData.photo || "/default-avatar.png";
  };


  // actionLinks array me 'path' property add karein
  const actionLinks = [
    { icon: Banknote, text: "Bank Details", path: "/bank-details" },
    { icon: Users, text: "Team", path: "/team" },
    { icon: Info, text: "About Us", path: "/about-us" },
    { icon: FileText, text: "T&C", path: "/term_conditions" },
    { icon: Handshake, text: "Support", path: "/support" },
    { icon: ShieldCheck, text: "KYC", path: "/kyc" },
    { icon: KeyRound, text: "Privacy Policy", path: "/policy" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative">
          <div className="absolute top-4 right-4">
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Save size={20} />
                  )}
                </button>
                <button
                  onClick={handleEditToggle}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditToggle}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Edit3 size={20} />
              </button>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

          <div className="relative inline-block group mb-4">
            <img
              src={getProfileImage()}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />

            {isEditing && (
              <>
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
              </>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              {/* Phone readonly */}
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
              <p className="text-gray-500">{userData.phone}</p>
            </>
          )}

        </div>

        {/* User Details Card (Read-only) */}
        {!isEditing && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div><p className="text-sm text-gray-500">Login ID</p><p className="text-lg font-bold text-gray-800">{user.user_id}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="text-lg font-bold text-gray-800">{user.email}</p></div>
              <div><p className="text-sm text-gray-500">Wallet Balance</p><p className="text-lg font-bold text-green-600">₹{user.wallet}</p></div>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}

export default UserProfile;