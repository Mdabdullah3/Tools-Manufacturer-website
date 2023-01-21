import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { HiPencilAlt } from 'react-icons/hi';
import { FaFacebookSquare, FaUserGraduate, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { IoLogoLinkedin } from 'react-icons/io';
import { GiWorld } from 'react-icons/gi';
import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { format } from 'date-fns';
const MyProfiles = () => {
    const [date, setDate] = useState(new Date());
    const formattedDate = format(date, "PP");
    useEffect(() => {
        setInterval(() => setDate(new Date()), 30000);
    }, []);
    
    const [user] = useAuthState(auth)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const email = user?.email;
        const url = `https://ford-server.onrender.com/user/${email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [userData])
    console.log(userData)

    return (
        <div className='w-10/12 mx-auto mb-20'>
            <div className='z-10'>
                <div className='md:w-11/12 w-full mx-auto mb-[-80px] relative'>
                    <div>
                        <img src="https://demos.creative-tim.com/soft-ui-dashboard-pro/assets/img/curved-images/curved0.jpg" className='rounded-xl mx-auto mt-10' alt="" />
                    </div>

                </div>
                <div className="bg-[#EFD6E7] rounded-lg relative shadow-lg overflow-hidden w-9/12 md:w-6/12 mx-auto py-10 pl-10 mb-5">
                    <div className='grid md:grid-cols-2 grid-cols-1 justify-between items-center'>
                        <div className='flex items-center'>
                            <img className='w-28 h-24 rounded-xl' src={userData?.img || user?.photoURL} alt="" />
                            <div>
                                <h1 className='ml-10 text-black text-xl font-semibold'>{userData?.name || user.displayName}</h1>
                                <h1 className='ml-10 text-black text-sm '>Member</h1>
                            </div>
                        </div>
                        <div className='mr-10 w-48 ml-auto mt-5 md:mt-0'>
                            <Link to="/updateProfile">
                                <h1 className="flex items-center full text-black py-2 px-3 border-black border-2">
                                    <HiPencilAlt className="mr-3 text-xl" />
                                    Edit Profile
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-info py-4 pl-10 rounded-xl'>
                <div className='flex flex-wrap md:flex-nowrap items-center justify-between'>
                    <div>
                        <p className="text-base font-medium leading-6 pb-5 text-secondary">{formattedDate} at {date.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })}</p>
                        <h1 className='text-xl font-bold text-secondary'>Bio -</h1>
                        <p className='text-secondary text-sm my-2 w-8/12'>{userData?.describe}</p>
                    </div>
                    <div className='flex gap-2 pr-12'>
                        <h1 className='bg-primary p-4 text-primary bg-opacity-5 text-2xl rounded-lg'>< FaFacebookSquare /></h1>
                        <h1 className='bg-primary p-4 text-primary bg-opacity-5 text-2xl rounded-lg'>< FaTwitterSquare /></h1>
                        <h1 className='bg-primary p-4 text-primary bg-opacity-5 text-2xl rounded-lg'>< FaInstagramSquare /></h1>
                        <h1 className='bg-primary p-4 text-primary bg-opacity-5 text-2xl rounded-lg'>< IoLogoLinkedin /></h1>
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-between'>
                    <div>
                        <h1 className='text-xl text-secondary mt-10'>Email -</h1>
                        <h1 className='text-lg my-2 gap-2 flex items-center text-secondary'> < AiOutlineMail /> {userData?.email || user?.email}</h1>
                        <h1 className='text-xl mt-3 text-secondary'>Location -</h1>
                        <h1 className='text-lg my-2 gap-2 flex items-center text-secondary'> < AiOutlineHome /> {userData?.address || "Bhola, Barisal, Bangladesh ."}</h1>
                        <h1 className='text-xl mt-3 text-secondary'>Phone -</h1>
                        <h1 className='text-lg my-2 gap-2 flex items-center text-secondary'> < AiOutlinePhone /> {userData.phone || "+880183....433"}</h1>
                    </div>
                    <div className='mr-10'>
                        <h1 className='text-xl text-secondary mt-10'>Education -</h1>
                        <h1 className='text-lg my-2 gap-2 flex items-center text-secondary'> < FaUserGraduate />{userData?.education || "Not Found"} </h1><h1 className='text-xl text-secondary mt-2'>Country -</h1>
                        <h1 className='text-lg my-2 gap-2 flex items-center text-secondary'> < GiWorld /> {userData?.country || "Bangladesh"}</h1>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default MyProfiles;