import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import auth from "../../../firebase.init";
import UseAdmin from "../../../Hooks/UseAdmin";
import { RiUserReceivedLine } from 'react-icons/ri';
import { AiOutlineShopping } from 'react-icons/ai';
import { MdOutlinePostAdd } from 'react-icons/md';
import { IoMdAppstore } from 'react-icons/io';
import { BsBookmarks } from 'react-icons/bs';
import { useState } from "react";
import { useEffect } from "react";
const DashBoard = () => {
  const [user] = useAuthState(auth);
  const [admin] = UseAdmin(user);

  const [userData, setUserData] = useState([])
  useEffect(() => {
    const email = user?.email;
    const url = `https://ford-server.onrender.com/user/${email}`
    fetch(url)
      .then(res => res.json())
      .then(data => setUserData(data))
  }, [userData])

  return (
    <div>
      <div class="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col h-auto">
          <Outlet></Outlet>
        </div>
        <div class="drawer-side mt-20 pl-10 w-72">
          <label for="dashboard-sidebar" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80  text-base-content">
            <li className="text-secondary text-lg mb-4 w-40">
              <NavLink to="/dashboard"> <BsBookmarks className="text-xl" /> DashBord</NavLink>
            </li>
            <ul>
              <li className="text-secondary text-lg mb-4 w-40">
                <NavLink to="/dashboard/user"> <RiUserReceivedLine className="text-xl" />All Users</NavLink>
              </li>
              <li className="text-secondary text-lg mb-4 w-48">
                <NavLink to="/dashboard/AddProduct"> <AiOutlineShopping className="text-xl" /> Add Products</NavLink>
              </li>

              <li className="text-secondary text-lg w-44  mb-4">
                <NavLink to="/dashboard/blog"><MdOutlinePostAdd className="text-xl" /> Blogs Post</NavLink>
              </li>
              <li>
                <div className="avatar ">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ml-6 mt-10">
                    {
                      user?.photoURL ? <img src={userData?.img || user?.photoURL} alt={userData?.name || user.displayName} className="w-12 p-0 text-primary" /> : <img src="https://i.ibb.co/rwGPsQ9/profile.jpg" alt={user.displayName} className="w-14 text-primary" />}
                  </div>
                </div>
                <h1 className="text-sm ml-6 text-secondary">{user?.displayName}</h1>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
