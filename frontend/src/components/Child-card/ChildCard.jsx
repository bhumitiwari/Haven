import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
const ChildCard = ({data,preference}) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    childid : data._id

  }
  const handleRemoveBook=async ()=>
  {
    const response =await axios.put("https://haven-lp3e.onrender.com/api/v1/remove-child-from-preference",{},{headers});
   
    alert(response.data.message)
  }
  return (
    <div className='bg-[#ef9273] rounded p-4 flex flex-col '> 
    <Link to={`/view-child-details/${data._id}`}>
    
        <div className=' rounded flex items-center justify-center'>
            <img src={data.url} alt="" className='h-[25vh] w-full' />
        </div>
        <h2 className=' mt-4 text-xl text-white font-semibold'>
            {data.name}
        </h2>
        </Link>
       <p className='mt-2 text-black font-semibold'>Age: {data.age}</p>
       {preference &&<button className='bg-black mt-2  text-white rounded-full text-xlpx-8 py-2 'onClick={handleRemoveBook}>Remove from preferences</button>}
       </div>
  )
}

export default ChildCard
