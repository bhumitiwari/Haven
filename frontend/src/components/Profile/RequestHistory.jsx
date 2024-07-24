import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../Loader/Loader';
import {Link } from "react-router-dom";
const RequestHistory = () => {
  const [RequestHistory, setRequestHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-request-history", { headers })
      setRequestHistory(response.data.data)
    }
    fetch();
  }, []);
  return (
    <div>
      {!RequestHistory && <div className='flex justify-center items-center h-[100%]'><Loader /></div>}
      {RequestHistory && RequestHistory.length === 0 && (
        <div className="p-4 h-[80vh]">
          <div className="flex justify-center items-center h-[100%]">
            <h1 className="text-5xl font-semibold mb-8">No Request History!!</h1>
          </div>
        </div>
      )}
      {RequestHistory && RequestHistory.length > 0 && (
        <div className="p-0 md:p-4 h-[100%">
          <h1 className="text-3xl md:text-5xl font-semibold mb-8">Your Request History</h1>
          <div className="mt-4 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[27%]">
              <h1 className="text-center">Name</h1>
            </div>
            <div className="w-[55%]">
              <h1 className="text-center">Description</h1>
            </div>
            <div className="w-[15%]">
              <h1 className="text-center">Status</h1>
            </div>
          </div>
          {RequestHistory.map((items, i) =>
            <div key={i} className="w-full rounded py-2 px-4 flex gap-4 hover:bg-black hover:text-white hover:cursor-pointer">
              <div className="w-[3%]">
                <h1 className="text-center">{i+1}</h1>
              </div>
              <div className="w-[27%] text-center" >
               <Link to={`/view-child-details/${items.child._id}`}>{items.child.name}</Link>
              </div>
              <div className="w-[55%]">
                <h1 className="text-center">{items.child.desc.slice(0,50)}...</h1>
              </div>
              <div className="w-[15%]">
                <h1 className="font-semibold text-green-700 text-center">
                  {items.status==="Request made"?(
                    <div className="text-yellow-500">{items.status}</div>):
                    items.status==="Request Denied"?(
                      <div className="text-red-500">{items.status}</div>):
                      (items.status)
                    }
                  
                </h1>
              </div>
            </div>
          )}
        </div>)}


    </div>
  )
}

export default RequestHistory;