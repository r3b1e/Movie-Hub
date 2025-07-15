import React, { use, useRef, useState } from "react";
import { ApiError, GoogleGenAI } from "@google/genai";
import axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { addRecomend } from "../Stores/recomendationSlice";
import Trending from "../packets/Trending";
import { useNavigate } from "react-router-dom";
import {GEMINI_API_KEY} from '../../../constant'


const MovieGpt = () => {
  const navigate = useNavigate();
  const API_KEY = import.meta.env.GEMINI_API_KEY;
  console.log(API_KEY)
  const search = useRef(null);
  const dispatch = useDispatch();
  const [getResult, setResult] = useState(false);
  const handleClick = () => {
    console.log(search.current.value);
    main(search.current.value);
  };

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  async function main(text) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "Act as movies recommendation system and recommend some movies for query : " +
        text +
        ". give only five movies name in comma seprated format. your response should look like Gadar,Maze runner,Don,Heraferi,Avengers",
    });
    let result = response.text;
    console.log(result);
    const arrResult = response.text?.toLocaleLowerCase()?.split(",");
    console.log(arrResult);
    let movieRecomendation =
      arrResult && arrResult.map((movie) => getMovieRecomendation(movie));

    movieRecomendation = await Promise.all(movieRecomendation);

    console.log(movieRecomendation, "new -> data");

    movieRecomendation = filterMovies(movieRecomendation, arrResult);

    console.log(movieRecomendation, "new ->");

    dispatch(addRecomend(movieRecomendation));

    setResult(true);
  }

  let mainMovie = useSelector((state) => state.recomend.items);
  console.log(mainMovie, "done");

  const filterMovies = (movie, result) => {
    const merged = {};
    const filtered = movie.map((eachPart) =>
      eachPart.filter(
        (imgMovie) =>
          imgMovie.poster_path !== null || imgMovie.backdrop_path !== null
      )
    );
    console.log(filtered, "filtered");
    result.forEach((element, inx) => {
      merged[element] = filtered[inx];
    });

    return merged;
  };

  function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  const getMovieRecomendation = async (movie) => {
    const response = await axios.get(`/search/movie?query=${movie}`);
    const data = response.data.results;
    console.log(data);
    return data;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-400 mb-2 mt-10">
            <span onClick={() => {navigate("/home")}} className="hover:text-white cursor-pointer">Home</span> • <b>Movie GPT •</b> 
          </div>
      <div className="flex mt-5 justify-center items-center">
        <input
          ref={search}
          name="inputsearch"
          className="bg-gray-700 px-4 py-3 text-md rounded w-100"
          type="text"
          placeholder="Enter Your Emotion..."
        />

        <i
          onClick={handleClick}
          className="cursor-pointer hover:bg-gray-700 rounded p-1 ri-search-line text-zinc-100 text-3xl ml-15"
        ></i>
      </div>
      <div className=" w-300 my-4 rounded-xl h-200">
        <h1 className="text-pink-600 text-3xl font-medium px-5 py-8">
          Recomedations
        </h1>
        {mainMovie &&
          Object.entries(mainMovie).map(([key, value], inx) => (
            <Trending key={inx} title={toTitleCase(key)} data={value} />
          ))}
      </div>
    </div>
  );
};

export default MovieGpt;
