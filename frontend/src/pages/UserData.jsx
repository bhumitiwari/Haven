import React from 'react';
import { IoMdClose } from "react-icons/io";

const UserData = ({userDivData,userDiv,setuserDiv}) => {
  return (<>
    <div className={`${userDiv} top-0 left-0 h-screen w-full opacity-80`}></div>{" "}
    <div className={`${userDiv} top-0 left-0 h-screen w-full flex flex-col items-center justify-center`} >
        <div className='rounded bg-white  p-4 w-[80%] md:w-[50%] lg:w-[40%]'>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">User Information</h1>
                <button className='bg-black text-white rounded-full ' onClick={()=>setuserDiv("hidden")}>
                <IoMdClose />
                </button> </div>
                <div className="mt-2">
                    <label htmlFor="">Username:{" "}
                    <span className='font-semibold'>
                        {userDivData.username}
                    </span></label>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Email:{" "}
                    <span className='font-semibold'>
                        {userDivData.email}
                    </span></label>
                </div>
                <div className="mt-2">
                    <label htmlFor="">Address:{" "}
                    <span className='font-semibold'>
                        {userDivData.address}
                    </span></label>
                </div>
            </div>

        
    </div>
    </>
  )
}

export default UserData