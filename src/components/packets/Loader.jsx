import React from "react";
import load from "../../assets/loader.gif"

function Loader(){
    return (
        <div className="w-full h-screen">
            <div className="lds-dual-ring ">
                <img className="w-full h-screen object-cover" src={load} alt="" />
            </div>
        </div>
    )
}

export default Loader;