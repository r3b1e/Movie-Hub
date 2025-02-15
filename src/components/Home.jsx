import React, { useEffect, useState } from "react";
import Sidebar from "./packets/Sidebar"
import Topnav from "./packets/Topnav";
import axios from "./utils/Axios"
import Header from "./packets/Header";
import Trending from "./packets/Trending"
import Loader from "./packets/Loader"

const Home = () => {
   const [wallpaper, setWallpaper] = useState({})

   const GetHeaderWallpaper = async ()=> {
    try {
        const {data} = await axios.get(`/trending/all/day`);
        console.log(data.results);
        
        let randomData = data.results[(Math.random()*data.results.length).toFixed()];
        console.log(randomData) 
        setWallpaper(data.results);
    }
    catch (error) {
        console.error(error);
    }
   }
   useEffect(() => {
    !wallpaper || GetHeaderWallpaper()
    console.log(wallpaper)
    // eslint-disable-next-line
   }, [])
   

    return wallpaper ? (
        <div className="w-full h-screen flex">
        <Sidebar />
        <div className="bg-[#181827] h-full w-[82%] overflow-y-auto">
        <Topnav />
        <Header data={wallpaper} />
        <Trending data={wallpaper} />
        </div>
        </div>
    ) : (<Loader />);
}

export default Home;