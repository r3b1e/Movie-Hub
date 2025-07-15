import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import unknown from "../../assets/Unknown_person.jpg"

function Topnav() {
  document.title = "Movie Hub | Homepage";
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState([]);
  const searchOnChange = (e) => {
    setSearch(e);
    // console.log(search.length)
  };

  const getSearchs = async () => {
    try {
      const d = await axios.get(`/search/multi?query=${search}`);
      // console.log(d)
      setSearchText(d.data.results);
      // console.log(searchText);
    } catch (error) {
      console.error("this",error);
    }
  };

  useEffect(() => {
    getSearchs();
    console.log(unknown)
    
  }, [search]);

  const keyPresent = (val, key) => val.some(obj => key in obj)

  return searchText ? (
    <>
      <div className="flex gap-20 items-center w-[80%] my-4 mx-auto select-none">
        <i className="ri-search-line text-zinc-100 text-3xl ml-15"></i>
        <input
          onChange={(e) => {
            searchOnChange(e.target.value);
          }}
          value={search}
          type="text"
          className="m-4 w-[54%] p-2 text-xl outline-none"
          placeholder="Search Anything"
        ></input>
        {search.length > 0 && (
          <span
            onClick={() => setSearch("")}
            className="text-4xl pointer cursor-pointer"
          >
            ×
          </span>
        )}
      </div>

      <div className="m-auto h-52 w-[50%] px- overflow-y-auto overflow-x-hidden absolute -translate-x-[50%] -translate-y-[50%] left-[56%] top-[30%] z-999">
        {searchText.map((s, i) => (
          <div key={i} className="hover:bg-[rgba(2,119,127,1)] w-full h-auto min-h-20 border-2 rounded-md py-2 px-5 m-1 flex justify-start gap-10 items-center duration-200 ease-out">
            <img
                      src ={(s.poster_path || s.backdrop_path) ? `https://image.tmdb.org/t/p/w500${s.poster_path || s.backdrop_path}` : unknown}
             
              alt={s.title}
              className="w-20 h-20 object-cover rounded shadow=lg drop-shadow-lg"
            />
            {/* <img src={unknown} /> */}
            {s.original_name || s.name || s.original_title || s.title}
          </div>
        ))}
      </div>
    </>
  ) : (
    <h1>loading</h1>
  );
}

export default Topnav;
