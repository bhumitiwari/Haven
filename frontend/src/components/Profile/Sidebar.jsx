import React from 'react';
import { Link,useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from "../../Store/auth";
const Sidebar = ({ data }) => {
    const dispatch=useDispatch();
    const history=useNavigate();
    const role=useSelector((state)=>state.auth.role);
    return (

        <div className='bg-[#ef9273] p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
            <div className='flex items-center flex-col justify-center'>{" "}
                <img src={data.avatar} className='h-[12vh] rounded-full' />
                <p className='mt-3 text-xl font-semibold'>
                    {data.username}
                </p>
                <p className='mt-1 text-normal '>
                    {data.email}
                </p>
                <div className='w-full mt-4  bg-black h-[1px] hidden lg:block'>
                    
                </div>
            </div>
           {role==="user" &&  <div className="w-full flex-col items-center justify-center hidden lg:flex">
                <Link to="/preferences" className='font-semibold w-full py-2 text-center hover:bg-white  rounded transition-all duration-300 '>Preferences</Link>
                <Link to="/profile" className='font-semibold w-full py-2 text-center hover:bg-white  rounded transition-all duration-300 '  >Request History</Link>
                <Link to="/profile/settings" className='font-semibold w-full py-2 text-center hover:bg-white  rounded transition-all duration-300 '  >Settings</Link>
            </div>}
            {role==="admin" &&  <div className="w-full flex-col items-center justify-center hidden lg:flex">
                <Link to="/profile" className='font-semibold w-full py-2 text-center hover:bg-white  rounded transition-all duration-300 '>All Requests</Link>
                <Link to="/profile/add-child" className='font-semibold w-full py-2 text-center hover:bg-white  rounded transition-all duration-300 '>Add Child</Link>
               
            </div>}
            <button className='bg-white rounded h-[5vh] w-3/6 lg:w-full mt-4 lg:mt-0 font-semibold flex items-center justify-center' onClick={()=>
                {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    history("/");
                }
            }>
                Log Out <FaArrowRightFromBracket className="ms-4" /></button>
          </div>
    )
}

export default Sidebar