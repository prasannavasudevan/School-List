import React, { useEffect, useState, useRef } from "react";
import SchoolImage from "../assets/schoolImage.jpg";
import SchoolCard from "../components/SchoolCard";
import axios from "axios";

const Home = () => {
  const [schools, setSchools] = useState([]);
  const featuredRef = useRef(null);
  const API = import.meta.env.VITE_API_URL;
console.log("API URL:", API); 

  const handleScroll = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get(`${API}/schools`)
      .then((res) => {
        if (res.data.success) setSchools(res.data.data);
      })
      .catch((err) => console.error("Error fetching schools:", err));
  }, [API]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <img
        className="w-full h-[90vh] object-cover bg-black/40"
        src={SchoolImage}
        alt="A school campus background"
      />
      <div className="absolute top-60 inset-0 flex flex-col items-center text-center">
        <p className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold leading-tight drop-shadow-lg">
          Discover Your <span className="text-purple-400">Future</span> School
        </p>
        <button
          onClick={handleScroll}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-purple-600 text-white rounded-md 
                 hover:bg-purple-500 transition-transform duration-150 ease-in-out active:scale-95 text-sm sm:text-base shadow-md"
        >
          Start Exploring
        </button>
      </div>

      {/* Featured Schools */}
      <div
        ref={featuredRef}
        className="px-6 sm:px-8 py-10 sm:py-12 dark:bg-gray-900"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">
          Featured Schools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {schools?.map((school) => (
            <SchoolCard key={school.id} schools={school} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
