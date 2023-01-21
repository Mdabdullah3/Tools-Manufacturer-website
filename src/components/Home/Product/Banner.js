import React from 'react';
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import './Style.css'
const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="extra relative">
            <div>
                <img
                    src="https://weddingdir.net/wp-content/uploads/2021/07/listing-location-ahmedabad-banner.jpg"
                    alt=""
                />
            </div>
            <div className="absolute bottom-16 left-40 text-white">
                <h1 className="font-mono text-3xl flex">
                    <span
                        onClick={() => navigate(-1)}
                        className=" cursor-pointer flex items-center gap-2 font-mono text-yellow-400 mr-2"
                    >
                        <AiFillHome /> Home
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default Banner;