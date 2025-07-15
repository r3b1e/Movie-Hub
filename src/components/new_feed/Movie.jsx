import React, { use, useEffect, useState } from 'react';
import axios from '../utils/Axios';
import Loader from "../packets/Loader"; 
import Cards from "./Cards";
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
function Movie(){
    const navigate = useNavigate()
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const sectionMovie = async() =>{
        try{
            const {data} = await axios.get(`/discover/movie?page=${page}`)
            // console.log(data.results)
            // console.log(data)
            
            if(page == 1){
                setMovie(data.results)
            }
            else{
                setMovie((prev) => [...prev, ...data.results])
            }

            if (data.page >= data.total_pages) {
                setHasMore(false);
            }setPage(prevState => prevState + 1)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        sectionMovie();
    }, [])

    const getBack = () => {
        navigate(-1)
    }

    return movie ? (
        <div className='bg-[#181827] h-fit w-full p-1'>
            <h2 className='text-2xl font-semibold mx-5 my-10'><span><i onClick={getBack} className="ri-arrow-left-line cursor-pointer hover:bg-sky-700"></i> </span>Popular Now</h2>
            <Cards data={movie} />

            <InfiniteScroll
            dataLength={movie.length}
            next={sectionMovie}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
                <p className="text-center my-5">
                    You have seen it all!
                </p>
            }
            ></InfiniteScroll>
            </div>
    ) : (
        <Loader />
    )
}

export default Movie;