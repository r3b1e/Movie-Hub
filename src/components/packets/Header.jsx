import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header({ data }) {
    // If data is not an array, convert it to an array with single item
    const movies = Array.isArray(data) ? data : [data];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex(prev => (prev + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies.length]);

    const handleLeftClick = () => {
        setDirection(-1);
        setCurrentIndex(prev => (prev - 1 + movies.length) % movies.length);
    };

    const handleRightClick = () => {
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % movies.length);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0
        })
    };

    return data ? (
        <div className="h-[75%] w-full relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.header
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ 
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/w500/${movies[currentIndex].backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="h-full w-full absolute inset-0"
                >
                    <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between px-4 z-20">
                        <button 
                            onClick={handleLeftClick}
                            className="hover:scale-110 transition-transform"
                        >
                            <i className="ri-arrow-left-circle-fill text-5xl text-white/80 hover:text-white"></i>
                        </button>
                        <button 
                            onClick={handleRightClick}
                            className="hover:scale-110 transition-transform"
                        >
                            <i className="ri-arrow-right-circle-fill text-5xl text-white/80 hover:text-white"></i>
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-10 z-10">
                        <h1 className="text-4xl font-bold mb-4">
                            {movies[currentIndex].original_title}
                        </h1>
                        <p className="max-w-2xl">{movies[currentIndex].overview}</p>
                    </div>
                </motion.header>
            </AnimatePresence>
        </div>
    ) : (
        <h3>loading</h3>
    );
}

export default Header;