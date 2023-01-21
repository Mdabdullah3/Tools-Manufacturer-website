import React from 'react';
import { Link, useNavigate } from "react-router-dom";
const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const navigateToDetails = (id) => {
        navigate(`/orderSummery/${id}`);
    };

    const navigateDetails = (id) => {
        navigate(`/ProductDetails/${id}`);
    }
    return (
        <div>
            <div class="inset-0 z-0 mx-auto">
                <div class="w-96 bg-info shadow-lg rounded-xl p-6">
                    <div class="mb-3">
                        <img src={item.img} alt="Just a flower" class=" w-96 h-80 object-fill  rounded-2xl" />
                    </div>
                    <div class="flex-auto justify-evenly">
                        <div class="flex flex-wrap ">
                            <div class="w-full flex-none text-sm flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-gray-400 whitespace-nowrap mr-3">4.60</span><span class="mr-2 text-gray-400">Bangladesh</span>
                            </div>
                            <div class="flex items-center w-full justify-between min-w-0 ">
                                <h2 class="mr-auto text-xl cursor-pointer text-secondary hover:text-primary truncate "> {item.name}</h2>
                                <div class="flex items-center bg-primary text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                    INSTOCK</div>
                            </div>
                        </div>
                        <div class="text-xl text-secondary font-semibold mt-1">${item.price}.00</div>
                        <div class="text-xl text-secondary font-semibold mt-1">Stock - {item.stock}.00</div>
                        <div class="lg:flex  py-4  text-sm text-gray-600">
                            <div class="flex-1 inline-flex items-center  mb-3">
                                <div class="w-full flex-none text-sm flex items-center text-gray-600">
                                    <ul class="flex flex-row justify-center items-center space-x-2">
                                        <li class="">
                                            <span class="block p-1 border-2 border-gray-900 hover:border-blue-600 rounded-full transition ease-in duration-300">
                                                <h1 class="block w-3 h-3 bg-blue-600 rounded-full"> </h1>
                                            </span>
                                        </li>
                                        <li class="">
                                            <span class="block p-1 border-2 border-gray-900 hover:border-yellow-400 rounded-full transition ease-in duration-300">
                                                <a href="#yellow" class="block w-3 h-3  bg-yellow-400 rounded-full"> </a>
                                            </span>
                                        </li>
                                        <li class="">
                                            <span class="block p-1 border-2 border-gray-900 hover:border-red-500 rounded-full transition ease-in duration-300">
                                                <a href="fd" class="block w-3 h-3  bg-red-500 rounded-full"> </a>
                                            </span>
                                        </li>
                                        <li class="">
                                            <span class="block p-1 border-2 border-gray-900 hover:border-green-500 rounded-full transition ease-in duration-300">
                                                <a href="#green" class="block w-3 h-3  bg-green-500 rounded-full"> </a>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex-1 inline-flex items-center mb-3">
                            </div>
                        </div>
                        <div class="flex space-x-2 text-sm font-medium justify-center">
                            <button onClick={() => navigateToDetails(item._id)} class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-primary px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                                Order Now
                            </button>
                            <button  class="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>

                            <button onClick={() => navigateDetails(item._id)}class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-primary px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                                <Link to="/purchase">Details</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;