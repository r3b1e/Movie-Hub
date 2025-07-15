import React from "react";


function CardsPerson(){
    return (
        <div className="group w-56 h-56 bg-red-200 relative rounded-full flex justify-center items-center transition-all hover:rounded-md duration-300 ease-in-out ">
        <div className="absolute w-40 h-40 bg-green-200 rounded-full transition-all duration-300 ease-in-out group-hover:rounded-md group-hover:-translate-y-10"></div>
    </div>
    

    )
}

export default CardsPerson;