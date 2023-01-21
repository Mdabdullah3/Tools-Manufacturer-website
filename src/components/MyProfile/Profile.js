import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import { HiPencilAlt } from 'react-icons/hi';
import './Profile.css'
const Profile = () => {
    const [user] = useAuthState(auth);
    const { data, isLoading, error } = useQuery("userProfile", async () => {
        const userData = await fetch(
            `https://carpenco-store.herokuapp.com/user/${user?.email}`,
            {
                method: "GET",
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        );
        return userData.json();
    });
    console.log(data);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="min-h-[75vh] grid place-content-center">
                <p>
                    Something went Wrong! <br /> Please try Again later.
                </p>
            </div>
        );
    }
    return (
        <div className="">
            <div className="flex items-center justify-center px-5 py-5">
                <div className="w-11/12 mx-auto border-b-2 border-primary overflow-hidden text-gray-800">
                    <div className="w-9/12 h-72 relative">
                        <img src="https://img.freepik.com/free-vector/space-banner-with-purple-planet-landscape_107791-6230.jpg?w=1480&t=st=1662720069~exp=1662720669~hmac=e22bc1551448a3c114ff020cb464912de469d23dd86640ec991bacd628125571" alt="" className='w-full h-48' />

                        <div className="absolute bottom-0 w-44 h-44 mx-auto md:mx-7 -mt-28 md:-mt-32 z-10 ">
                            <img
                                src={data.img || user?.photoURL}
                                alt=""
                                className="w-full h-full rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                            />
                        </div>
                        <div className="flex lg:justify-end mt-6  justify-center lg:mr-10">
                            <Link to="update-profile">
                                <button className="btn btn-primary btn-outline text-secondary">
                                    <HiPencilAlt className="mr-3 text-xl" />
                                    Update Profile
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full px-8 pt-3 pb-8">
                        <div className="-mx-3 md:flex">
                            <div className="px-3 w-full md:w-2/3 text-center md:text-left mb-5 text-secondary">
                                <h1 className="text-2xl">
                                    {data?.name || user?.displayName || "Gest User"}
                                </h1>
                                <h3 className="text-lg">
                                    {data?.education || "Not Found"}
                                </h3>
                                <h4 className="text-lg text-secondary">
                                    {data?.address || "Dhaka, Bangladesh"}
                                </h4>
                            </div>
                            <div className="px-3 w-full md:w-1/2 mb-5">
                                <ul className="text-center md:text-left">
                                    <li className="inline-block md:block mb-2 mx-3">
                                        <Link
                                            to="#"
                                            className="font-semibold text-blue-500 hover:text-blue-600 group"
                                        >
                                            <span className="inline-flex items-center justify-center w-8 h-8 text-lg rounded-full bg-blue-500 group-hover:bg-blue-600 text-white mr-2">
                                                <i className="mdi mdi-phone"></i>
                                            </span>{" "}
                                            <span className="group-hover:underline">
                                                Phone: {data?.phone}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="inline-block md:block mb-2 mx-3">
                                        <Link
                                            to="#"
                                            className="font-semibold text-blue-500 hover:text-blue-600 group"
                                        >
                                            <span className="inline-flex items-center justify-center w-8 h-8 text-lg rounded-full bg-blue-500 group-hover:bg-blue-600 text-white mr-2">
                                                <i className="mdi mdi-email-outline"></i>
                                            </span>
                                            <span className="group-hover:underline">
                                                Email: <span>{user?.email}</span>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="inline-block md:block mb-2 mx-3">
                                        <Link
                                            to="#"
                                            className="font-semibold text-blue-500 hover:text-blue-600 group"
                                        >
                                            <span className="inline-flex items-center justify-center w-8 h-8 text-lg rounded-full bg-blue-500 group-hover:bg-blue-600 text-white mr-2">
                                                <i className="mdi mdi-web"></i>
                                            </span>{" "}
                                            <span className="group-hover:underline">
                                                Website: {data.website}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full text-center md:text-left">
                            <p className="text-sm leading-tight">
                                {data?.describe ||
                                    "I'm a Jr. Full Stack Web Developer. I Like To Upgrade My Self Day By Day. I Have A Plan For Next 6 Months. I Will Learn React.js. After That I Will Start Learning Node.js along with TypeScript. Then I Will Dive Into Node.js. Beside These I Have Good Interest In Python and Django. I Wish I Could Learn Them Soon Insha'Allah. Also I Will Be Learning Backend Development After Sometime. I am Working 6-8 Hours Daily For Achieving My Goals As Soon As Possible."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;