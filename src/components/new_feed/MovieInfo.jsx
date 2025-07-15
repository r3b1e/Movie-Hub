import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../Stores/detailSlice";
import useRemove from "./useRemove";
import Topnav from "../packets/Topnav";

const MovieInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const items = useSelector((state) => state.detail.items);
  const isPresent =
    Array.isArray(items) && items.some((item) => item.id === Number(id));

  const handleClickAdd = async () => {
    if (isPresent) {
      dispatch(removeItems(Number(id)));
    } else {
      dispatch(addItems(data));
    }
  };

  useEffect(() => {
    console.log(isPresent);
  }, [isPresent]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/movie/" + id);
      const data = await response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white p-8 font-sans">
      <div className="ml-55"><Topnav /></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={"https://image.tmdb.org/t/p/w500/" + data?.poster_path} // replace with actual image path
            alt={data?.original_title}
            className="w-64 rounded-lg shadow-lg"
          />
          <span className="mt-4 text-sm text-pink-400">Watch It Now</span>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="text-sm text-gray-400 mb-2">
            <span onClick={() => {navigate("/home")}} className="hover:text-white cursor-pointer">Home</span> • TV • {data?.original_title}
          </div>
          <h1 className="text-4xl font-bold mb-4">{data?.original_title}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-pink-500 px-2 py-1 rounded text-xs font-semibold">
              PG-13
            </span>
            <span className="bg-gray-600 px-2 py-1 rounded text-xs font-semibold">
              HD
            </span>
            <span className="bg-green-600 px-2 py-1 rounded text-xs font-semibold">
              cc 13
            </span>
            <span className="bg-blue-700 px-2 py-1 rounded text-xs font-semibold">
              🎙️ 13
            </span>
            <span className="bg-gray-500 px-2 py-1 rounded text-xs font-semibold">
              TV
            </span>
            <span className="bg-gray-500 px-2 py-1 rounded text-xs font-semibold">
              24m
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button onClick={() => navigate(`/watch/${id}`)} className="bg-pink-500 z-99 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium">
              ▶ Watch now
            </button>
            <button
              onClick={() => handleClickAdd()}
              className="bg-white z-99 cursor-pointer text-black px-6 py-2 rounded-full font-medium hover:bg-blue-500"
            >
              {isPresent ? "- Remove" : "+ Add to List"}
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6">{data?.overview}</p>

          {/* Info Table */}
          <div className="text-sm text-gray-300 space-y-1 mb-6">
            <p>
              <strong>Original Language: </strong>
              {data?.original_language}
            </p>
            <p>
              <strong>Synonyms:</strong> {data?.homepage}
            </p>
            <p>
              <strong>Aired:</strong> Jan 3, 2024 to Mar 27, 2024
            </p>
            <p>
              <strong>Revenue:</strong> {data?.revenue} $
            </p>
            <p>
              <strong>Duration:</strong> {data?.runtime} Min
            </p>
            <p>
              <strong>Status:</strong> {data?.status}
            </p>
            <p>
              <strong>MAL Score:</strong> {data?.vote_average}
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {data?.genres.map((genre) => (
              <span
                key={genre?.id}
                className="bg-gray-700 px-3 py-1 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Studio & Producers */}
          <div className="text-sm text-gray-400">
            <p>
              <strong>Studios:</strong> Movie Hub
            </p>
            <p>
              <strong>Language:</strong> {data?.spoken_languages.map((len, inx) => (
                <span
                key={inx}
                className="bg-gray-700 px-3 py-1 rounded-full text-xs"
              >
                {len.name}
              </span>
              ))}
            </p>
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center gap-4">
            <img
              src="https://cdn.myanimelist.net/images/userimages/14786129.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span>Share Movie</span>
            <button className="bg-blue-600 px-3 py-1 text-sm rounded">
              Share
            </button>
            <button className="bg-black px-3 py-1 text-sm rounded">
              X Tweet
            </button>
            <button className="bg-indigo-500 px-3 py-1 text-sm rounded">
              Facebook
            </button>
            <button className="bg-orange-600 px-3 py-1 text-sm rounded">
              Reddit
            </button>
            <button className="bg-green-500 px-3 py-1 text-sm rounded">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
