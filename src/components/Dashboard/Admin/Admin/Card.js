import React from "react";
import Charts from "./Charts";
import { MdDownloadDone } from 'react-icons/md';
const Card = () => {
    return (
        <div className="flex mt-10 flex-wrap gap-10 w-11/12 md:mx-0 mx-auto items-start mr-auto">
            <div className="md:ml-20 mx-auto md:mx-0 mb-2">
                <div className="text-secondary font-semibold font-mono -mt-10 p-5 w-56 py-8 bg-primary/20 rounded-3xl">
                    <p className="text-xl font-bold ml-4">New Cilents</p>
                    <div className="flex mx-8 gap-4 items-center">
                        <h1 className="text-4xl font-bold">51</h1>
                        <p>+18.7%</p>
                    </div>
                </div>
                <div className="text-secondary font-semibold font-mono  p-5 w-56 py-8 bg-primary/20 rounded-3xl mt-5">
                    <p className="text-xl font-bold ml-4">Today Sales</p>
                    <div className="flex mx-8 gap-4 items-center">
                        <h1 className="text-4xl">$72<span className="text-xl">k</span></h1>
                        <p>+40.3%</p>
                    </div>
                </div>
            </div>
            <div className="md:block hidden">
                <Charts />
            </div>
            <div>
                <div className="">
                    <div className="text-secondary font-semibold font-mono h-72 -mt-10 p-5 w-64 py-8 bg-primary/20 rounded-3xl">
                        <p className="text-xl font-bold ml-4">Performances</p>
                        <div className="flex mx-8 gap-4 mt-4 items-center justify-around">
                            <div>
                                <h1 className="text-3xl font-bold">72%</h1>
                                <h1 className="text-sm text-secondary/60">Income</h1>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">41%</h1>
                                <h1 className="text-sm text-secondary/60">Spending</h1>
                            </div>
                        </div>
                        <p className="mt-5 mb-1 flex items-center gap-2"> <span className="text-xl px-2 py-2 bg-primary/5 text-primary rounded-full"><MdDownloadDone /></span> Spending Course</p>
                        <p className="mb-1 flex items-center gap-2"> <span className="text-xl px-2 py-2 bg-primary/5 text-primary rounded-full"><MdDownloadDone /></span> Chash Back Offer</p>
                        <p className="mb-1 flex items-center gap-2"> <span className="text-xl px-2 py-2 bg-primary/5 text-primary rounded-full"><MdDownloadDone /></span> Account Security</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
