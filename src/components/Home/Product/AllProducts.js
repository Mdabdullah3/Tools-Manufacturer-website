import { useNavigate } from "react-router-dom";
import useProducts from "../../../Hooks/UseProducts";
import ProductCard from "./ProductCard";
import { AiFillHome } from "react-icons/ai";
import './Style.css'
import { useState } from "react";
import { ImSearch } from "react-icons/im";
import Pagination from "./Pagination";
const AllProducts = () => {
    const [product] = useProducts();
    const reverse = [...product].reverse();
    const navigate = useNavigate()
    const [filter, setFilter] = useState("");
    // Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const searchEvent = (event) => {
        setFilter(event.target.value);
    };

    let dataSeacrch = reverse.filter((item) => {
        return Object.keys(item).some((key) =>
            item[key]
                .toString()
                .toLowerCase()
                .includes(filter.toString().toLowerCase())
        );
    });

    console.log(dataSeacrch);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentData = dataSeacrch.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <div className="z-10">
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
                                <AiFillHome /> Back
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="bg-info border-b-2 border-primary relative overflow-hidden w-6/12 p-0 mx-auto">
                    <input
                        type="text"
                        className=" placeholder-secondary border-none px-10 text-xl font-mono input py-10 w-full text-secondary"
                        value={filter}
                        placeholder="Search Your Products"
                        onChange={searchEvent.bind(this)}
                    />
                    <h1 className="absolute bottom-6 right-12 text-primary text-3xl ">
                        <ImSearch />
                    </h1>
                </div>
            </div>
            <div className="mt-36 grid lg:grid-cols-3 w-10/12 mx-auto gap-x-8 gap-y-8 items-center">
                {currentData?.map((item) => (
                    <ProductCard item={item} />
                ))}
            </div>

            <Pagination
                totalItem={reverse?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

        </>
    );
};

export default AllProducts;