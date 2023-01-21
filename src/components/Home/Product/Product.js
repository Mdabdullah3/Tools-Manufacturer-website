import React from 'react';
import { Link } from "react-router-dom";
import useProducts from "../../../Hooks/UseProducts";
import ProductCard from './ProductCard';
const Product = () => {
    const [product] = useProducts();
    const reverse = [...product].reverse();
  
    return (
        <>
            <h2 className="text-center text-4xl font-bold mt-48 text-primary">
                Latest {" "}
                <span className="border-primary border-b-4 text-secondary">
                    Products
                </span>
            </h2>
            <div className="mt-10 grid lg:grid-cols-3 w-10/12 mx-auto gap-x-8 gap-y-8 items-center">
                {reverse.slice(0, 6).map((item) => (
                    <ProductCard item={item} />
                ))}
            </div>
            <div className='md:w-56 mt-24 w-5/12 mx-auto'>
                <button className='w-full mx-auto bg-primary py-4 text-white px-3 font-mono text-xl rounded-lg'> <Link to="/allProducts">More Products</Link> </button>
            </div>

        </>
    );
}

export default Product;


