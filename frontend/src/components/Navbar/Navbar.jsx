import { FaHandsHoldingChild } from "react-icons/fa6";
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";

import { useSelector } from "react-redux";
const Navbar = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

const role=useSelector((state) => state.auth.role);

  const [MobileNav, setMobileNav] = useState("hidden");
  return (<>
    <nav className='navbar z-50 top-0 right-0 left-0 bg-[#ef9273] text-white px-3 py-3 font-sans flex justify-between'>
      <Link to="/" className='font-sans text-base flex gap-2 '><FaHandsHoldingChild className="text-3xl"/><img className='' src="" alt="" /><h1 className='logo text-3xl'>Haven</h1></Link>
      <div className="nav-links flex gap-8 pt-0.5 ">

        <ul className='lg:flex hidden gap-8 pt-0.5'>
          <Link to="/" className='hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duration:300 text-xl'>Home</Link>
          

          <Link to="/all-profiles" className='hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duration:300 text-xl'>Child Profiles</Link>

</ul>
        {isLoggedIn === true && role==="user" && <div className="hidden lg:flex pt-0.5  gap-4"> <Link to="/profile" className='profile hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duration:300 text-xl'>My Profile</Link>

          <Link to="/preferences" className='preference hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duration:300 text-xl'>Preferences</Link>
        </div>
        }
        {isLoggedIn === true && role==="admin" && <div className="hidden lg:flex pt-0.5  gap-4"> <Link to="/profile" className='profile hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duration:300 text-xl'>Admin Profile</Link> </div>}

      


        {
          isLoggedIn === false && <div className="hidden lg:flex  gap-4">
            <Link to="/Login" className='px-3 py-1 border  border-black rounded  hover:border-white hover:text-white transition-all duration-300'>SignIn</Link>
            <Link to="/SignUp" className='px-3 py-1  bg-black text-white hover:text-black rounded hover:bg-white transition-all duration-300'>SignUp</Link>
          </div>
        }

        <button className='text-white text-2xl md:hidden block hover:text-black' onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
          <FaGripLines />
        </button>

      </div>


    </nav >
    <div className={`${MobileNav} h-screen bg-[#ef9273] absolute top-0 left-0 w-full z-40 flex flex-col justify-center items-center`}>
      <ul className={`${MobileNav} flex flex-col  text-white text-xl font-semibold items-center`}>
        <Link to="/" className={`${MobileNav} text-4xl hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duratio mb-8n:300 mb-8 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>Home</Link>
        
        <Link to="/all-profiles" className={`${MobileNav} hover:text-white hover:cursor-pointer hover:border-b-2 hover:border-white transition-all duration:300 text-4xl mb-8 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>Child Profiles</Link>

        {isLoggedIn === true && role==="user" && <div> <Link to="/profile" className={`${MobileNav} hover:text-white hover:cursor-pointer text-center hover:border-b-2 hover:border-white transition-all duration:300 text-4xl mb-8 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>My Profile</Link>
          <Link to="/preferences" className={`${MobileNav} hover:text-white hover:cursor-pointer hover:border-b-2 text-center hover:border-white transition-all duration:300 text-4xl mb-8 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>Preferences</Link></div>}
          {isLoggedIn === true && role==="admin" && <div> <Link to="/profile" className={`${MobileNav} hover:text-white hover:cursor-pointer text-center hover:border-b-2 hover:border-white transition-all duration:300 text-4xl mb-8 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>Admin Profile</Link>
          </div>}
           {
          isLoggedIn === false && <div><Link to="/Login" className={`${MobileNav} px-3 py-1 mb-8 text-2xl font-semibold border  border-black rounded hover:border-white hover:text-white transition-all duration-300 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>SignIn</Link>
            <Link to="/SignUp" className={`${MobileNav} px-3 py-1 mb-8 text-2xl font-semibold bg-black text-white hover:text-black rounded hover:bg-white transition-all duration-300 `} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))} >SignUp</Link></div>}

      </ul></div></>


  )
}

export default Navbar;