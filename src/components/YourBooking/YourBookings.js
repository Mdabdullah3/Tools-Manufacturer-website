import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import CheckoutFormA from "./CheckoutFormA";
const stripePromise = loadStripe(
    "pk_test_51LXS98B5Y3AeAE8iNY0Hgf4QUbKwQQVuUk1NqhUhbNZ1UhjYvdE5UJw3DnEJBLmlWBgFqKIjfXEnVZujomnNCAyo00kHESTAcf"
);

const YourBookings = () => {

    const [cancle, setCancle] = useState(false);
    const [paymentData, setPaymentData] = useState({});
    const cancleHandle = () => {
        setCancle(true)
    }
    const crossHandle = () => {
        setCancle(false)
    }

    const handlePayment = (item) => {
        console.log(item)
        setPaymentData(item)
    }

    const [myOrders, setmyOrders] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() => {
        const email = user?.email;
        const url = `https://ford-server.onrender.com/myitems?email=${email}`;
        fetch(url, {
            method: "GET",
        })
            .then((res) => {
                return res?.json();
            })
            .then((data) => setmyOrders(data));
    }, [myOrders]);

    console.log(myOrders)

    // const filterItems = (bookings) => {
    //     const updatedItems = bookings.filter((item) => {
    //         return item.status === 'pending';
    //     });
    //     setBooking(updatedItems);
    // };

    // Set Date and Time 
    const [date, setDate] = useState(new Date());
    const formattedDate = format(date, "PP");
    useEffect(() => {
        setInterval(() => setDate(new Date()), 30000);
    }, []);

    const [data, setData] = useState({});

    const total = myOrders?.reduce((accumulator, object) => {
        return accumulator + object?.price;
    }, 0);

    const cancleOrder = (id) => {
        const proced = window.confirm("Are Your Sure Delete This User");
        if (proced) {
            const url = `https://ford-server.onrender.com/myOrders/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {

                    const reamingData = user.filter((user) => user._id !== id);
                    setData(reamingData);
                    console.log('yes');

                    toast.success("Succesfully Delete User");
                });
        };
    }

    return (
        <div className="">
            <div className="mt-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

                <div className="flex justify-start item-start space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-secondary">Order #99398</h1>
                    <p className="text-base font-medium mb-2 leading-6  text-secondary">{formattedDate} at {date.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}</p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg--primary-content px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full font-mono">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-secondary font-mono mb-4">Customer’s Cart</p>


                            {
                                myOrders?.map((item) => (<div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full mb-5">
                                    <div className="w-full md:w-40">
                                        <img className="w-full hidden md:block rounded" src={item.img} alt="dress" />
                                    </div>
                                    <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                                        <div className="w-full flex flex-col justify-start items-start space-y-2">
                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-secondary ">{item.product}</h3>
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm leading-none text-secondary">
                                                    <span className="text-gray-500">Quantity: </span> {item.order}
                                                </p>
                                                <p className="text-sm leading-none text-secondary">
                                                    <span className="text-gray-500">Location: </span> {item.address}
                                                </p>
                                                <p className="text-sm leading-none text-secondary">
                                                    <span className="text-gray-500">Date: </span> {item.date}
                                                </p>
                                                <p className="text-sm leading-none text-secondary">
                                                    <span className="text-gray-500">Phone: </span> {item.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lg:flex justify-between items-center  mx-auto lg:space-x-8  w-full">
                                            {
                                                item?.status ?
                                                    < p className="text-base xl:text-lg leading-6 text-white">  <button className="btn btn-primary text-white" >{item.status}</button></p> :
                                                    < p className="text-base xl:text-lg  leading-6 text-secondary">  <label htmlFor="my-modal-6" className="btn modal-button btn-primary text-white" onClick={() => handlePayment(item)}>Pay Now</label></p>

                                            }


                                            <p className="text-base xl:text-lg font-semibold leading-6 text-secondary">${item.price}</p>
                                            {
                                                item?.status ?
                                                    " " :
                                                    <button onClick={() => cancleOrder(item._id)} className="text-base xl:text-lg leading-6 text-secondary"> <p className="uppercase btn  text-white cursor-pointer btn-primary">Cancel</p>
                                                    </button>
                                            }
                                            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                                            <div className="modal mt-10">
                                                <div className="modal-box relative text-seondary bg-info">


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>))
                            }
                        </div>
                        <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg--primary-content space-y-6   ">
                                <h3 className="text-xl font-semibold leading-5 text-secondary">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between  w-full">
                                        <p className="text-base leading-4 text-secondary">Subtotal</p>
                                        <p className="text-base leading-4 text-secondary">${total}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg--primary-content space-y-6  font-mono">
                                <h3 className="text-xl font-semibold leading-5 text-secondary" >You Are Ordering {myOrders?.length} Service</h3>
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div className="w-8 h-8">
                                            <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                        </div>
                                        <div className="flex flex-col justify-start items-center">
                                            <p className="text-lg leading-6 font-semibold text-secondary">
                                                DPD Order
                                                <br />
                                                <span className="font-normal text-secondary">Total Amount </span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold leading-6 text-secondary">${total}</p>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                        <div className="bg-info modal-box relative">
                                            <label htmlFor="my-modal-6" className="btn-circle  btn-sm  absolute right-2 top-3">✕</label>
                                            <div className="">
                                                <div className="flex flex-col ">
                                                    <h1 className="font-bold capitalize text-3xl my-4 text-secondary">Make a Payment</h1>
                                                </div>
                                                <div className="card-body text-secondary">
                                                    <Elements stripe={stripePromise}>
                                                        <CheckoutFormA paymentData={paymentData} />
                                                    </Elements>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg--primary-content w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                        <h3 className="text-xl font-semibold leading-5 text-secondary">Customer</h3>
                        <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-primary">
                                    <img className="w-20 rounded-[50%]" src={user?.photoURL} alt="avatar" />
                                    <div className=" flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-secondary">{user?.displayName}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-primary w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#11DEDE" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="#11DEDE" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 text-secondary">{user?.email}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
};

export default YourBookings;