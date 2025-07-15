import React from "react";
import Loader from "./Loader"
import { Link } from "react-router-dom";

const Sidebar = () => {
    const features = [["Trending", "ri-fire-fill", "trending"], ["Popular", "ri-bard-fill", "populars"], ["Movies", "ri-film-fill", "movies"], ["Tv shows", "ri-slideshow-3-fill", "trending"], ["People", "ri-user-2-fill", "people"]]
    const info = [["About", "ri-information-2-fill", "trending"], ["Contact", "ri-phone-fill", "trending"]]

    
    
  return (
    <div className="bg-[#181827] h-full w-[18%] border-r-[1px] border-zinc-100 px-7 py-10 text-[#E0FFFF]">
        <div className="flex gap-3 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgba(2,119,127,1)"
        className="h-6"
      >
        <path d="M15.4142 4.99998H21.0082C21.556 4.99998 22 5.44461 22 6.00085V19.9991C22 20.5519 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5553 2 19.9991V6.00085C2 5.44808 2.45531 4.99998 2.9918 4.99998H8.58579L6.05025 2.46445L7.46447 1.05023L11.4142 4.99998H12.5858L16.5355 1.05023L17.9497 2.46445L15.4142 4.99998Z"></path>
      </svg>
      <h2 className="text-2xl font-semibold">Movie Hub</h2>
      </div>
      <h1 className="text-md my-6 font-semibold">New Feed</h1>
      <div className="flex flex-col">
        {features.map((val, inx) => (<Link to={val[2]} key={inx} onClick={<Loader />} className="hover:bg-[#62629f] hover:opacity-100 py-4 px-4 rounded-md m-1 text-sm opacity-50 duration-300 ease-out cursor-pointer"><i className={`${val[1]} text-red-100 mr-3`}></i>{val[0]}</Link>))}
      </div>

      <hr></hr>

      <h1 className="text-md my-6 font-semibold">Website Information</h1>
      <div className="">
        {info.map((val, inx) => (<h4 key={inx} className="hover:bg-[#62629f] hover:opacity-100 py-4 px-4 rounded-md m-1 text-sm opacity-50 duration-300 ease-out"><i className={`${val[1]} text-red-100 mr-3`}></i>{val[0]}</h4>))}
      </div>
      

    </div>
  );
};

export default Sidebar;
