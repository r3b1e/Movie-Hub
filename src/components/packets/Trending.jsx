import React from "react";

function Trending({ data }) {
    const movies = Array.isArray(data) ? data : [data];
    console.log("movie", movies)
  return (
    <div>
      <h2 className="text-2xl font-semibold mx-5 my-10">Trending Movies</h2>
      <div className="m-5 flex gap-2 overflow-x-auto overflow-y-hidden">
        {movies.map((v, i) => (
            <div key={i}
            className="h-60 w-40 drop-shadow-xl rounded-md relative overflow-hidden flex-shrink-0"
          >
            <img
              className="h-full w-full object-cover object-top"
              src={`https://image.tmdb.org/t/p/w500${v.poster_path}`}
            />
            <h2
              // style={{ color: "hsl(240, 77.90%, 42.50%)" }}
              className="absolute w-full bottom-0 flex justify-between px-2 text-yellow-400 opacity-100"
            >
              <i className="ri-bookmark-fill absolute top-[-200px] bg-black rounded-full w-8 text-center h-8 text-sm p-2"></i>
              <span className="text-sm fomt-bold p-2 uppercase text-blue-600">{v.
original_language
}</span>
              <span className="text-sm p-2 uppercase">
                {v.vote_average}
                <i className="ri-star-s-fill text-yellow-400"></i>
              </span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
