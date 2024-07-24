import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../Loader/Loader";
const Settings = () => {
  const [Value, setValue] = useState({ address: "" })
  const [ProfileData, setProfileData] = useState({ address: "" })
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  }
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value })
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://haven-lp3e.onrender.com/v1/get-user", { headers })
      setProfileData(response.data)
      setValue({ address: response.data.address })
    }
    fetch();
  }, []);
  const submitAddress = async () => {
    const response = await axios.put("http://localhost:3000/api/v1/update-address", Value, { headers })
    alert(response.data.message)
  }
  return (
    <>
      {!ProfileData && (
        <div className="w-full flex items-center justify-center"> <Loader /></div>)}{" "}
      {ProfileData && (
        <div className="p-0 md:p-4 h-[100%]">
          <h1 className="text-3xl md:text-5xl font-semibold mb-8">Settings</h1>

          <div className="flex gap-12">
            <div className="" >
              <label htmlFor="">Username</label>
              <p className="text-center bg-[#ef9273] rounded font-semibold mt-2">
                {ProfileData.username}
              </p>

            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="text-center rounded bg-[#ef9273] w-[20vw] font-semibold mt-2">
                {ProfileData.email}
              </p>

            </div></div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="">Address</label>
              <textarea name="address" className='mt-2 bg-[#ef9273] font-semibold rounded' rows="5" placeholder='Address' value={Value.address} onChange={change} />


            </div>
            <div className="mt-4 flex justify-end">
              <button className='bg-black text-white font-semibold px-3 py-2 rounded-full hover:bg-white hover:text-black ' onClick={submitAddress}>Update</button>
            </div>

          </div>
       
      )}
    </>
  )
}

export default Settings
