import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { authActions } from "../Store/auth";
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value })
  }
  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required")
      }
      else {
        const response = await axios.post("http://localhost:3000/api/v1/sign-in", Values)
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
         localStorage.setItem("id",response.data.id);
        localStorage.setItem("role",response.data.role);
        localStorage.setItem("token",response.data.token);
navigate("/profile")
      }
    }
    catch (error) {
     alert(error.response.data.message);
    }
  }

  return (


    <div className='px-12  flex justify-center h-[100vh]  items-center '>
      <div className="bg-[#ef9273] rounded-lg px-8 py-2  lg:mt-0  w-full md:w-3/6 lg:w-2/6">
        <h1 className='text-xl text-center'>Sign In</h1>
        <div className="mt-4">
          <div>
            <label htmlFor="">
              Username
            </label>
            <input type="text" className='bg-white w-full mt-2 outline-none p-2' placeholder='Username' name="username" required value={Values.username} onChange={change} />
          </div>

          <div className="mt-4">
            <label htmlFor="">Password</label>
            <input type="password" className='bg-white w-full mt-2 outline-none p-2' placeholder='Password' name="password" required value={Values.password} onChange={change} />

          </div>

          <div className="mt-4">
            <button className='bg-black w-full mt-2 text-white font-semibold rounded hover:bg-white hover:text-black hover:border-black p-2' onClick={submit} >Sign In</button>
          </div>
          <p className='flex mt-4 items-center justify-center font-semibold'>Or</p>
          <p className="flex mt-4 items-center justify-center font-semibold">Don't have an account? &nbsp;
            <Link to="/SignUp" className='hover:text-white'>
              <u>SignUp</u></Link>
          </p>
        </div></div></div>
  )
}

export default Login