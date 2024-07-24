import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [Values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:""})
    const navigate=useNavigate();
    const change=(e)=>{
      const {name,value}=e.target;
      setValues({...Values,[name]:value})
    }
    const submit=async()=>{
      try{
if(Values.username===""||Values.email===""||Values.password===""||Values.address==="")
{
  alert("All fields are required")
}
else
{const response =await axios.post("http://localhost:3000/api/v1/sign-up",Values)
  alert(response.data.message)
  navigate("/Login")
      }}
      catch(error){
        alert(error.response.data.message);
      }
    }
  return (
    <div className='px-12 lg:py-8 py-1 flex justify-center h-[100vh] mt-0 items-center'>
    <div className="bg-[#ef9273] rounded-lg px-8 py-2 lg:mt-0  w-full md:w-3/6 lg:w-2/6">
      <h1 className='text-xl text-center'>Sign Up</h1>
      <div className="mt-4">
        <div>
          <label htmlFor="">
            Username
          </label>
          <input type="text" className='bg-white w-full mt-2 outline-none p-2' placeholder='Username' name="username" required value={Values.username} onChange={change}/>
        </div>
        <div className="mt-4">
          <label htmlFor="">Email</label>
          <input type="text" className='bg-white w-full mt-2 outline-none p-2' placeholder='Email' name="email" required value={Values.email} onChange={change}/>

        </div>
        <div className="mt-4">
          <label htmlFor="">Password</label>
          <input type="password" className='bg-white w-full mt-2 outline-none p-2' placeholder='Password' name="password" required value={Values.password} onChange={change}/>

        </div>
        <div className="mt-4">
          <label htmlFor="">Address</label>
          <textarea className='bg-white w-full mt-2 outline-none p-2' placeholder='Address' name="address" required value={Values.address} onChange={change} />

        </div>
        <div className="mt-4">
          <button className='bg-black w-full mt-2 text-white font-semibold rounded hover:bg-white hover:text-black hover:border-black p-2' onClick={submit} >Sign Up</button>
        </div>
        <p className='flex mt-4 items-center justify-center font-semibold'>Or</p>
        <p className="flex mt-4 items-center justify-center font-semibold">Already have an account? &nbsp;
         <Link to="/Login" className='hover:text-white'>
         <u>SignIn</u></Link>
        </p>
      </div>
    </div>

  </div>
  )
}

export default SignUp