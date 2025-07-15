import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CardsPerson from "./CardsPerson"
import axios from '../utils/Axios';
function People(){
    const navigate = useNavigate()

    const [person, setPerson] = useState()

    const persontDetail = async() => {
        const {data} = await axios.get()
    }

    const getBack = () => {
        navigate(-1)
    }

    return (
        <div className='bg-[#181827] h-fit w-full p-1'>
        <h2 className='text-2xl font-semibold mx-5 my-10'><span><i onClick={getBack} className="ri-arrow-left-line cursor-pointer hover:bg-sky-700"></i> </span>Popular Now</h2>
        <CardsPerson />
        </div>
    )
}

export default People;