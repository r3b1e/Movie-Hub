import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import Loader from "../packets/Loader";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../packets/Topnav";
function Populars(){
    const [popMovies, setPopMovies] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();
    
    const popularMovies = async() => {
        try{
        const {data} = await axios.get(`/movie/popular?page=${page}`)
        console.log(data)
        if (page == 1){
            setPopMovies(data.results)
        }
        else{
            setPopMovies(prevState => [...prevState,...data.results])
        }
        
        if (data.page >= data.total_pages) {
            setHasMore(false);
        }setPage(prevState => prevState + 1)
        
        }
        catch(error){
            console.error("this is error", error)
        }
    }
    useEffect(()=>{
        popularMovies()
        // eslint-disable-next-line
    }, [])

    const getBack = () => {
        navigate(-1)
    }
    return popMovies.length ? (
        <div className='bg-[#181827] h-fit w-full p-1'>
            <Topnav />
            <h2 className='text-2xl font-semibold mx-5'><span><i onClick={getBack} className="ri-arrow-left-line cursor-pointer hover:bg-sky-700"></i> </span>Popular Movies</h2>
            <Cards data={popMovies} />
            <InfiniteScroll
            dataLength={popMovies.length}
            next={popularMovies}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
                <p className="text-center my-5">
                    You have seen it all!
                </p>
            }
            >

        </InfiniteScroll>
        </div>
        
    ) : (<Loader />);

}

export default Populars;