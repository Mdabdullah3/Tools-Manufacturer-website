import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";

const ProductDetails = () => {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const url = `https://ford-server.onrender.com/products/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, [id]);
    console.log(order)

    const navigateToDetails = (id) => {
        navigate(`/orderSummery/${id}`);
    };
    const { _id, img, name, minorder, stock, price } = order;
    return (
        <section class="body-font">
            <div className="z-10">
                <div className="-mb-[20px] relative">
                    <div>
                        <img
                            src="https://weddingdir.net/wp-content/uploads/2021/07/listing-location-ahmedabad-banner.jpg"
                            alt=""
                        />
                    </div>
                    <div className="absolute bottom-16 left-40  text-white">
                        <h1 className="font-mono text-3xl flex ">
                            <span
                                onClick={() => navigate(-1)}
                                className=" cursor-pointer flex items-center gap-2 font-mono text-yellow-400 mr-2"
                            >
                                <AiFillHome /> Back
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="bg-info border-b-2  h-16 border-primary relative overflow-hidden w-6/12 p-0 mx-auto">
                    <h1 className="font-mono font-lg mt-4 mx-10">
                        <span className='text-secondary'>Product</span> /
                        <span className="text-yellow-500 ml-2 font-mono">
                            {name}
                        </span>
                        <span className="text-secondary ml-2 font-mono">
                            / Order
                        </span>
                    </h1>
                </div>
            </div>
            <div class="container px-5 py-24 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 class="text-sm title-font text-secondary tracking-widest">TOOLS NAME,</h2>
                        <h1 class="text-secondary text-3xl title-font font-medium mb-4">{name}</h1>
                        <p class="leading-relaxed text-secondary mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
                        <div class="flex border-t border-primary py-2">
                            <span class="text-secondary">Stock</span>
                            <span class="ml-auto text-primary">{stock}</span>
                        </div>
                        <div class="flex border-t border-primary py-2">
                            <span class="text-secondary">Min Order</span>
                            <span class="ml-auto text-primary">{minorder}</span>
                        </div>
                        <div class="flex border-t border-b mb-6 border-primary py-2">
                            <span class="text-secondary">Quantity</span>
                            <span class="ml-auto text-primary">4</span>
                        </div>
                        <div class="flex">
                            <span class="title-font font-medium text-2xl text-primary"><span className='text-secondary text-lg'>Price</span> - ${
                                price}.00</span>
                            <button onClick={() => navigateToDetails(_id)} class="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Order Now</button>
                            <button class="rounded-full w-10 h-10 bg-primary bg-opacity-5 p-0 border-0 inline-flex items-center justify-center text-secondary ml-4">
                                <svg fill="#11DEDE" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={img} />
                </div>
            </div>
        </section >
    );
};

export default ProductDetails;
