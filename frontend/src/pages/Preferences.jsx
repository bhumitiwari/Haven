import React, { useEffect, useState } from 'react';
import axios from "axios";
import ChildCard from "../components/Child-card/ChildCard";

const Preferences = () => {

  const [Preferences, setPreferences] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {

    const fetch = async () => {
      const response = await axios.get("https://haven-lp3e.onrender.com/api/v1/get-preferred-children", { headers });
      setPreferences(response.data.data);
    }
    fetch()
  }, [Preferences])

  return (

    <div className='bg-[#fef9f8] px-12 h-auto py-20'>
      {" "}
      <h4 className='text-6xl text-center profiles'>Preferred Children</h4>
      {Preferences && Preferences.length===0 &&
       (<div className='flex justify-center text-center items-center text-3xl mt-[20vh] mb-[15vh]'>No preferred children!!</div>)
        }


<div className='my-8 grid grid-col grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 '>

  {
    Preferences && Preferences.map((items, i) => (
      <div key={i}><ChildCard data={items} preference={true} /></div>))}</div>
      
    </div >
   )
}
export default Preferences
