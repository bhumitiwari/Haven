import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const ViewDetails = () => {
  const navigate=useNavigate();
  const { id } = useParams();

  const [Data, setData] = useState();
 const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn);
 const role= useSelector((state)=>state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-child-by-id/${id}`
      );

      setData(response.data.data);

    };
    fetch();
  }, []);
  const headers= {
  id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    childid :id
  };
  const handlePreference=async ()=>{
    const response = await axios.put("http://localhost:3000/api/v1/add-child-to-preference",{},{headers});
    alert(response.data.message)
  }
  const deleteChild=async()=>{
   const response= await axios.delete("http://localhost:3000/api/v1/delete-child",{headers})
   alert(response.data.message);
   navigate("/all-profiles")
  }
  
  const handleRequest=async()=>{
    try{
      const response=await axios.post('http://localhost:3000/api/v1/request',{},{headers})
      alert(response.data.message);
      navigate("/profile");
}
    catch(error){
      console.log(error);
    }
  }
  return (
    <>
      {Data && (
        <div className='px-12 lg:py-8 py-20 bg-[#fef9f8] flex lg:gap-8 md:flex-row flex-col'>
          <div className="lg:p-4 p-0  bg-white lg:h-[90vh]  lg:w-3/6 w-full lg:flex items-center  justify-center">
            <img src={Data.url} className='lg:h-[70vh] h-[50vh] rounded-full md:rounded' alt="" />
            {isLoggedIn===true &&role==="admin" && <div className=' flex md:flex-col justify-center items-center'>
              <Link to={`/updateChild/${id}`} className=' text-4xl p-2 m-2 bg-[#ef9273]  hover:bg-black rounded-full text-white'>
              <MdEdit />
            </Link>
              <button className= ' rounded-full m-2 text-4xl p-2  bg-[#ef9273] hover:bg-black text-white' onClick={deleteChild}>
                <MdDelete /></button></div>}
                {isLoggedIn===true &&role==="user" && <div className=' flex md:flex-col justify-center items-center'>
              <button className=' m-4 bg-[#ef9273] text-white hover:bg-black rounded-full text-4xl p-2 'onClick={handlePreference}>
              <FaHeart />
            </button>
              </div>}
            </div>
          <div className="lg:p-20 lg:w-3/6 flex flex-col   ">
            <h1 className="text-4xl py-3 name lg:text-start text-center">{Data.name}</h1>
            <p className="mt-1 font-semibold">Age: {Data.age}</p>
            <p className="mt-1 font-semibold">Gender: {Data.gender}</p>
            <p className="mt-1 font-semibold">Hobbies: {Data.hobbies}</p>
            <p className="mt-2 font-semibold">Orphanhood Reason: {Data.orphanhoodReason}</p>
            <p className="mt-2 font-semibold text-xl">About {Data.name}: <br /> {Data.desc}</p>
            {isLoggedIn===true &&role==="user" &&<button className='h-10 text-xl justify-items-center mt-10 bg-black text-white font-semibold rounded-full' onClick={handleRequest}>Request for Adoption</button>}
          </div>

        </div>)
      }
      {!Data && (<div className='h-screen bg-[#fef9f8] flex items-center justify-center'><Loader /> {" "}</div>)}

    </>
  )
}

export default ViewDetails