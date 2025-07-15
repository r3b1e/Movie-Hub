import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Watch = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getTeaser, setGetTeaser] = useState(null);
  const [getData, setGetData] = useState(null);
  useEffect(() => {
    let isMounted = true;

    const getDetails = async () => {
      try {
        const response = await axios.get(`/movie/${id}/videos`);
        const data = response.data;
        const teaser = data.results?.filter((val) => val.type === "Trailer");
        if (isMounted) {
          setGetTeaser(teaser.length ? teaser[0] : data.results?.[0]);
        }
      } catch (error) {
        console.error("error fetching videos:", error);
      }
    };

    const getIndiDetail = async () => {
      try {
        const response = await axios.get(`/movie/${id}`);
        const data = response.data;
        if (isMounted) {
          setGetData(data);
        }
      } catch (error) {
        console.error("error fetching movie details:", error);
      }
    };

    getDetails();
    getIndiDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleClick = () => {
    navigate("/movie-info/" + id);
  };

  return (
    <div className="min-h-screen flex text-white font-sans ">
      {/* Left - Video Player */}
      <div className="flex-1 flex-col flex items-center justify-center bg-gradient-to-b from-[#1f1f2f] to-[#292944]">
        <div className="text-sm text-gray-400 mb-2 w-full px-20 py-5">
          <span
            onClick={() => {
              navigate("/home");
            }}
            className="hover:text-white cursor-pointer"
          >
            Home
          </span>{" "}
          • TV • {getData?.original_title}
        </div>
        <div className="w-full h-[80%] overflow-hidden rounded-lg border-2 border-white">
          <iframe
            className="scale-160 aspect-video"
            src={`https://www.youtube.com/embed/${getTeaser?.key}?autoplay=1&mute=1&controls=0&disablekb=1&rel=0&modestbranding=1&playsinline=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Right - Anime Info Panel */}
      <div className="w-full max-w-xs bg-gradient-to-b from-[#1f1f2f] to-[#292944] p-4 overflow-y-auto">
        <img
          src={"https://image.tmdb.org/t/p/w500/" + getData?.poster_path} // Replace with actual image
          alt={getData?.original_title}
          className="w-40 h-auto mx-auto rounded-lg mb-4 mt-25"
        />

        <h1 className="text-xl font-bold text-center mb-4">
          {getData?.original_title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 text-xs mb-4">
          <span className="bg-white text-black px-2 py-1 rounded">PG-13</span>
          <span className="bg-pink-500 px-2 py-1 rounded">HD</span>
          <span className="bg-green-600 px-2 py-1 rounded">cc 13</span>
          <span className="bg-blue-700 px-2 py-1 rounded">🎤 13</span>
          <span className="bg-gray-500 px-2 py-1 rounded">TV</span>
          <span className="bg-gray-500 px-2 py-1 rounded">24m</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4">
          {getData?.overview.slice(0, 150) + "..."}
        </p>

        <button
          onClick={handleClick}
          className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Watch;
