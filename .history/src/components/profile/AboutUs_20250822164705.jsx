import React, { useEffect, useState } from "react";
import { getAboutUs } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  const [aboutUsContent, setAboutUsContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const data = await getAboutUs();
        setAboutUsContent(data.about_us);
      } catch {
        setAboutUsContent(
          "Sorry, we couldn't load the About Us content at this time."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg
          className="animate-spin h-12 w-12 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="status"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-100 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-12 flex flex-col space-y-10">
        {/* Header */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-7 h-7" />
            <span className="text-xl font-semibold tracking-wide">Back</span>
          </button>
          <h1 className="flex-grow text-5xl font-extrabold tracking-tight text-gray-900">
            About Us
          </h1>
        </div>

        {/* Content */}
        <article className="prose prose-indigo max-w-full text-gray-800 leading-relaxed">
          {aboutUsContent.split("\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </article>
      </div>
    </div>
  );
};

export default AboutUs;
