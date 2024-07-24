import React, { useEffect,useState } from 'react';

import axios from "axios";
import Loader from "../components/Loader/Loader";
import ChildCard from '../components/Child-card/ChildCard'
const Profiles = () => {
  const [Data,setData]=useState();
  useEffect(()=>{
    const fetch=async ()=>{
      const response=await axios.get(
        "https://haven-lp3e.onrender.com/api/v1/get-children"
      );
      
      setData(response.data.data);
    };
  fetch();
  },[]);
  return (
    <div className='bg-[#fef9f8] px-12 h-auto py-20'>
      {" "}
      <h4 className='text-6xl text-center profiles'>Child Profiles</h4>{
        !Data&& (<div className='flex items-center justify-center my-8'><Loader/>{" "}
            </div>
        )}
      
      <div className='my-8 grid grid-col grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 '>
      
{
  Data &&
  Data.map((items,i)=>(
<div key={i}>
  <ChildCard data={items}/>{" "}
  </div>
  ))
}
      </div>
    </div>
  )
}

export default Profiles
