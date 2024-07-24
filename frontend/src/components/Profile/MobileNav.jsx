import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../Store/auth';
const MobileNav = () => {
const role=useSelector((state)=>state.auth.role);
  return (
   <div>{role==="user" && <div className="w-full items-center justify-center lg:hidden flex ">
   
      <Link to="/preferences" className='font-semibold w-[50%] m-2 h-[5vh] py-2 text-center bg-[#ef9273] hover:text-white border-black border-rounded border-2 rounded transition-all duration-300 '>Preferences</Link>
      <Link to="/profile" className='font-semibold w-full py-2 m-2 h-[5vh]  text-center bg-[#ef9273] hover:text-white border-black border-rounded border-2 rounded   transition-all duration-300 '  >Request History</Link>
      <Link to="/profile/settings" className='font-semibold w-[50%] py-2 m-2 h-[5vh]  text-center bg-[#ef9273] hover:text-white border-black border-rounded border-2 rounded transition-all duration-300 '  >Settings</Link>
 </div>}
 {role==="admin" && <div className="w-full items-center justify-center lg:hidden flex ">
   
   
   <Link to="/profile" className='font-semibold w-full py-2 m-2 h-[5vh]  text-center bg-[#ef9273] hover:text-white border-black border-rounded border-2 rounded  transition-all duration-300 '  >All Requests</Link>
   <Link to="/profile/add-child" className='font-semibold w-full py-2 m-2 h-[5vh]  text-center bg-[#ef9273] hover:text-white border-black border-rounded border-2 rounded  transition-all duration-300 '>Add Child</Link>
</div>}
 </div>
  )
}

export default MobileNav