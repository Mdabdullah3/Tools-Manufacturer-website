import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
const OrderSummery = () => {
    const [user] = useAuthState(auth);
    const [order, setOrder] = useState([]);
    const [newData, setNewData] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const url = `https://ford-server.onrender.com/products/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, [id, newData]);

    const [date, setDate] = useState(new Date());
    const formattedDate = format(date, "PP");
    useEffect(() => {
        setInterval(() => setDate(new Date()), 30000);
    }, []);
    const { _id, img, minorder, stock, price } = order;

    const navigate = useNavigate();
    const navigateDetails = (id) => {
        navigate(`/ProductDetails/${id}`);
    }
    const [fName, setfName] = useState(1);
    const total = parseInt(price) * parseInt(fName) + 8;

    const [stockNumber, setStockNumber] = useState({ quantity: "" });

    let name, value;
    const handleChange = event => {
        setfName(event.target.value);
        name = event.target.name;
        value = event.target.value;
        setStockNumber({ ...stockNumber, [name]: value });
    };

    const [addres, setAddress] = useState('')

    const handleAddress = event => {
        setAddress(event.target.value);
    }

    const [phone, setPhone] = useState('')
    const handlePhone = event => {
        setPhone(event.target.value);

    }

    const handleBooking = async (id, stock) => {
        const { quantity } = stockNumber;
        console.log("stock", stock);
        const getQuantity = parseInt(stock) - parseInt(quantity);
        const newQuantity = {
            stock: getQuantity.toString(),
        };
        console.log(newQuantity);
        // send data to the monogod server and update
        const url = `https://ford-server.onrender.com/products/${id}`;
        await axios.put(url, newQuantity).then((response) => {
            const { data } = response;
            if (data) {
                setNewData(!newData);
            }
        })
        const booking = {
            productId: _id,
            product: order.name,
            order: fName,
            price: total,
            img: order?.img,
            email: user.email,
            user: user.displayName,
            address: addres,
            phone: phone,
            date: formattedDate
        };
        fetch("https://salty-fortress-85484.herokuapp.com/myOrders", {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success("Proudct Succesfull Added, Check Collection");
                navigate(`/`)
            });
    }
    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-secondary">Order id - #{_id?.slice(4, 11)}</h1>
                <p className="text-base font-medium leading-6  text-secondary">{formattedDate} at {date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-secondary">Customer’s Cart</p>
                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-40 h-32 hidden md:block" src={img} alt="tools" />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-secondary">{order?.name}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-secondary">
                                            <span className="text-secondary">Stock: </span> {stock}
                                        </p>
                                        <p className="text-sm leading-none text-secondary">
                                            <span className="text-gray-300">Minorder: </span> {minorder}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base text-secondary xl:text-lg leading-6">
                                        ${price}.00 <span className="text-red-300 line-through"> $45.00</span>
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 text-secondary">01</p>
                                    <button onClick={() => navigateDetails(_id)} class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-primary px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-info space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-secondary">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-secondary">Price</p>
                                    <p className="text-base leading-4 text-secondary">${price}.00</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-secondary">
                                        Min Order
                                    </p>
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="quantity"
                                        placeholder={minorder}
                                        className="rounded input input-bordered border-2 border-primary text-secondary text-md mb-1 h-10 w-20"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-secondary">Shipping</p>
                                    <p className="text-base leading-4 text-secondary">$8.00</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-secondary">Total</p>
                                <p className="text-base font-semibold leading-4 text-secondary">${total}.00</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-info space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-secondary">Shipping</h3>
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                    <div class="w-8 h-8">
                                        <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-secondary">
                                            DPD Delivery
                                            <br />
                                            <span className="font-normal">Delivery with 24 Hours</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold leading-6 text-secondary">${total}.00</p>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button onClick={() => handleBooking(_id, stock)} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 text-xl  focus:ring-primary py-5 w-96 md:w-full bg-primary font-bold leading-4 text-white">Confirm Order</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-info w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-secondary">Customer</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-secondary">{user?.displayName}</p>
                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#11DEDE" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#11DEDE" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-secondary">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-secondary">Shipping Address</p>
                                    <p className='text-sm text-secondary my-1'>Your Address</p>
                                    <input
                                        onChange={handleAddress}
                                        type="text"
                                        name="address"
                                        placeholder="Dhaka, Bangla ...."
                                        className="rounded input input-bordered border-2 border-primary text-secondary text-md mb-1 h-10 w-60"
                                        required
                                    />
                                    <p className='text-sm text-secondary my-1'>Your Phone Number</p>
                                    <input
                                        onChange={handlePhone}
                                        type="phone"
                                        name="phone"
                                        placeholder="+88017....9"
                                        className="rounded input input-bordered border-2 border-primary text-secondary text-md mb-1 h-10 w-60"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummery;