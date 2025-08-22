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
      } catch (error) {
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
      <div className="flex items-center justify-center h-60">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
    <div className="flex-1 max-w-4xl mx-auto py-12 px-8 space-y-12 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 rounded-xl shadow-lg">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Back</span>
        </button>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          About Us
        </h1>
      </div>

      {/* About content */}
      <article className="prose prose-indigo max-w-none text-gray-700 leading-relaxed">
        <p>{aboutUsContent}</p>
      </article>
    </div>
  );
};

export default AboutUs;
