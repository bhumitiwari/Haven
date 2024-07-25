import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUser } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import UserData from './UserData';
const AllRequests = () => {
  const [AllRequests,setAllRequests]=useState();
  const [Options,setOptions]=useState(-1);
  const [Values,setValues]=useState({ status:"" });
  const [userDiv,setuserDiv]=useState("hidden");
  const [userDivData,setuserDivData]=useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};

useEffect(() => {
  const fetch = async () => {
    const response = await axios.get("https://haven-lp3e.onrender.com/api/v1/get-all-requests", { headers })
    setAllRequests(response.data.data)
  }
  fetch();
}, [AllRequests]);
const change=(e)=>{
  const {value}=e.target;
  setValues({status: value})
}
const submitChanges=async(i)=>{
  const id= AllRequests[i]._id;
  const response=await axios.put(`https://haven-lp3e.onrender.com/api/v1/update-status/${id}`,Values,{headers})
  alert(response.data.message)
}

  return (<>
{!AllRequests && <div className='h-[100%] flex items-center justify-center'>{" "}<Loader/><div/>
  </div>}
  {AllRequests && AllRequests.length>0 && (
        <div className="p-0 md:p-4 h-[100%] bg-zinc-700 text-white rounded-xl">
          <h1 className="text-3xl md:text-5xl font-semibold mb-8">Your Request History</h1>
          <div className="mt-4 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[5%] text-center">
              <h1>Sr.</h1>
            </div>
            <div className="w-[40%] text-center md:w-[20%]">
              <h1>Name</h1>
            </div>
            <div className="md:w-[45%] text-center w-0 hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[53%] text-center md:w-[28%]">
              <h1>Status</h1>
            </div>
            <div className="w-[2%] text-center">
              <h1 ><FaUser /></h1>
            </div>
          </div>
          {AllRequests.map((items,i)=>(
<div key={i} className="bg-zinc-500 rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300">
<div className="w-[5%] text-center">
              <h1 className="text-center">{i+1}</h1>
            </div>
            <div className="w-[40%] text-center md:w-[20%]">
            <Link to={`/view-child-details/${items.child._id}`} className='hover:text-gray-400' >{items.child.name}</Link>
            </div>
            <div className="md:w-[45%] text-center w-0 hidden md:block">
              <h1 className="text-center">{items.child.desc.slice(0,50)}...</h1>
            </div>
            <div className="w-[53%] text-center md:w-[28%]">
            <h1 className="font-semibold">
            <button className='hover:scale-105 transition-all duration-300' onClick={()=>setOptions(i)}>
            
                  {items.status==="Request made"?(
                    <div className="text-yellow-500">{items.status}</div>):
                    items.status==="Request Denied"?(
                      <div className="text-red-500">{items.status}</div>):items.status==="Submitted for Approval"?
                        (<div className="text-green-900">{items.status}</div>
                        ) :
                    (<div className="text-green-500">{items.status}</div>
                    )
                    }
                  
                  </button>
                  <div className={`${Options===i?"flex":"hidden"} flex mt-4`}>
                  
                    <select name="status" id="" className='bg-slate-700 w-[120%] ' onChange={change} value={Values.status}>
                      {["Request made","Submitted for Approval","Request Approved for authentication","Request Denied"
                        
                      ].map((items,i)=>(
<option value={items} key={i}>
  {items}
</option>
                      ))}
                    </select>
                    <button className='text-green-500 hover:text-pink-600 mx-2' 
                    onClick={()=>{setOptions(-1);
                      submitChanges(i);
                    }}>
                    <FaCheck />
                    </button>
                  </div></h1>
            </div>
            <div className="w-[2%] text-center">
              <button className='text-2xl hover:text-orange-400' onClick={()=>{
                setuserDiv("fixed");
                setuserDivData(items.user);}}><GoArrowUpRight />

                </button>
            </div>

</div>
          ))}

          </div>)}
          {userDivData && (
            <UserData userDivData={userDivData}
            userDiv={userDiv}
            setuserDiv={setuserDiv}/>)}
          
  </>
  )
}

export default AllRequests
