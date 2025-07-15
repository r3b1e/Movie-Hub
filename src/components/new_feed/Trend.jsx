import React, { useEffect, useState } from 'react';
import axios from "../utils/Axios";
import Loader from "../packets/Loader";
import Cards from "./Cards";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Topnav from '../packets/Topnav';

function Trend() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    const trendingMovies = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day?page=${page}`);
            
            if (page === 1) {
                setMovies(data.results);
            } else {
                setMovies((prev) => [...prev, ...data.results]);
            }
            
            // Check if we've reached the last page
            if (data.page >= data.total_pages) {
                setHasMore(false);
            }
            console.log(page)
            console.log(data)
            setPage(prev => prev + 1);
        } catch (err) {
            console.error(err);
            setHasMore(false);
        }
    }

    useEffect(() => {
        trendingMovies();
    }, []); // Only run once when component mounts

    const getBack = () => {
        navigate(-1)
        
    }

    return movies.length ? (
        <div className='bg-[#181827] h-fit w-full p-1'>
            <Topnav />
            <h2 className='text-2xl font-semibold mx-5'><span><i onClick={getBack} className="ri-arrow-left-line cursor-pointer hover:bg-sky-700"></i> </span>Trending Now</h2>
            <InfiniteScroll 
                dataLength={movies.length}
                next={trendingMovies}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={
                    <p className="text-center my-5">
                        You have seen it all!
                    </p>
                }
            >
                <Cards data={movies} />
            </InfiniteScroll>
        </div>
    ) : (<Loader />);
}

export default Trend;