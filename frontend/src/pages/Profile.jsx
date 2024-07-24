import React, { useEffect,useState} from 'react';
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector} from "react-redux";
import axios from "axios";
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';
const Profile = () => {
  //const isLoggedIn=useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-user", {headers})
      setProfile(response.data);
    }
    fetch();
  }, [])
  return (
    <div className='bg-[#fef9f8] px-2 md:px-12 flex flex-col md:flex-row lg:h-screen h-auto py-8 gap-4'>
    {!Profile && <div className='w-full h-[100%] flex items-center justify-center '><Loader /> </div>} 
    {Profile &&  <>  <div className="md:w-1/6 full">
        <Sidebar data={Profile}/>
        <MobileNav/>
        </div>
        
        <div className="md:w-5/6 full">
          <Outlet />
      </div></>}
    </div>
  )
}

export default Profile