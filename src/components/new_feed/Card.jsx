import React from "react";
import unknown from "../../assets/Unknown_person.jpg"
import { useNavigate } from "react-router-dom";
function Card({ data }) {
  const navigate = useNavigate();
  const handleClickIndivisual = (val) => {
    console.log(val.id)
    navigate(`/watch/${val.id}`);
  }

  return (
    <div className="cursor-pointer h-60 w-40 drop-shadow-xl rounded-md relative overflow-hidden flex-shrink-0 hover:scale-95 transition-transform duration-300 ease-in-out"
        onClick={() => handleClickIndivisual(data)}>
      <img
        className="h-full w-full object-cover object-top"
         src ={(data.poster_path || data.backdrop_path) ? `https://image.tmdb.org/t/p/w500${data.poster_path || data.backdrop_path}` : unknown}
      />
      {/* <h2 className="bg-blaxk">hello</h2> */}
      <h2
        className="card-text absolute w-full bottom-0 flex justify-between px-0 font-medium"
        style={{ 
            // padding: '20px 10px'
        }}
      >
        <span className="language-text text-sm p-2 uppercase">
            {data.original_language}
        </span>
        <span className="rating-text text-sm p-2 uppercase flex items-center gap-1">
            {data.vote_average ? data.vote_average.toFixed(1) : null}
            <i className="ri-star-s-fill text-yellow-400"></i>
        </span>
      </h2>
    </div>
  );
}

export default Card;
