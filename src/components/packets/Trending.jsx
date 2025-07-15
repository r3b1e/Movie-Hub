
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Trending({ title, data }) {
  const movies = useMemo(() => Array.isArray(data) ? data : [data], [data]);
  const [filter, setFilter] = useState([]);
  const [dropDown, setdropDown] = useState(false);
  
  const navigate = useNavigate();

  const filterOptions = useMemo(() => {
  const types = movies.map((val) => val.media_type);
  return ["All", ...new Set(types)];
}, [movies]);
  console.log("movies ->", movies)
  const handleClick = (val) => {
    if (val == 'All'){
      setFilter(movies);
      return
    }
    const filteredData = movies.filter((v) => v.media_type == val);
    setFilter(filteredData);
    console.log("filterdata",filteredData);
  }
  const handleClickIndivisual = (val) => {
    console.log(val.id)
    navigate(`/watch/${val.id}`);
  }
  useEffect(()=>{
    setFilter(movies);
  }, [movies])
  return (
    <div>
      <div className="flex justify-between px-5 items-center">
      <h2 className="text-2xl font-semibold mx-5 my-10">{title ? title : "Trending Movies"}</h2>
      <div className="relative mx-15">
        <button onClick={()=>setdropDown(!dropDown)} className="cursor-pointer text-lg font-medium">Filter</button>
        <div className="w-20 absolute z-99">
          {dropDown &&
            filterOptions.map((val, inx) => (
              
              <div onClick={() => handleClick(val)} key={inx} className="text-xs border-1 border-white cursor-pointer hover:bg-[#62629F] rounded-sm px-2 my-1">
                {val}
              </div>
            ))
          }
        </div>

      </div>
      </div>

      <div className="m-10 flex gap-2 overflow-x-auto overflow-y-hidden ">
        {filter.map((v, i) => (
          <div
            key={i}
            onClick={() => handleClickIndivisual(v)}
            className="h-60 w-40 drop-shadow-xl rounded-md relative overflow-hidden flex-shrink-0 cursor-pointer hover:scale-95 transition-transform duration-300 ease-in-out
"
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
              <span className="text-sm fomt-bold p-2 uppercase text-blue-600">
                {v.original_language}
              </span>
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
