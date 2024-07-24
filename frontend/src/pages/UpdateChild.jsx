import React, {useState ,useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateChild = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [Data, setData] = useState({
    url: "",
    name: "",
    age: "",
    gender: "",
    hobbies: "",
    desc: "",
    orphanhoodReason: "",

  })
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
childid:id
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  }
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.name === "" ||
        Data.age === "" ||
        Data.gender === "" ||
        Data.hobbies === "" ||
        Data.desc === "" ||
        Data.orphanhoodReason === ""

      ) {
        alert("All fields are required");
      }
      else {
        const response = await axios.put(
          "https://haven-lp3e.onrender.com/api/v1/update-child", Data, { headers }
        );
        setData({
          url: "",
          name: "",
          age: "",
          gender: "",
          hobbies: "",
          desc: "",
          orphanhoodReason: "",
        })
      alert(response.data.message);
        
        navigate(`/view-child-details/${id}`)
      }
    }
    catch (error) {
      alert(error.response.data.message)
    }
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://haven-lp3e.onrender.com/api/v1/get-child-by-id/${id}`
      );

      setData(response.data.data);

    };
    fetch();
  }, []);
  return (
    <div className='h-[100%] m-8 '>
      <h1 className="text-3xl  font-semibold mb-3">
        Update Child
      </h1>
      <div className="p-4 rounded bg-[#ef9273]">
        <div>
          <label htmlFor="">Image</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Url for photograph' name="url" required value={Data.url} onChange={change} />
        </div>

        <div className='mt-4'>
          <label htmlFor="">Full Name</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Full Name' name="name" required value={Data.name} onChange={change} />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
          <label htmlFor="">Age</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Age' name="age" required value={Data.age} onChange={change} />
          </div>
          <div className="w-3/6">
          <label htmlFor="">Gender</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Gender' name="gender" required value={Data.gender} onChange={change} />
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="">Hobbies</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Hobbies' name="hobbies" required value={Data.hobbies} onChange={change} />
        </div>
        <div className='mt-4'>
          <label htmlFor="">Description</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Child Description' name="desc" required value={Data.desc} onChange={change} />
        </div>
        <div className='mt-4'>
          <label htmlFor="">Orphanhood Reason</label>
          <input type="text" className='w-full mt-1 p-1 outline-none rounded' placeholder='Orphanhood Reason' name="orphanhoodReason" required value={Data.orphanhoodReason} onChange={change} />
        </div>
        <button className='mt-2 px-3 w-full bg-black text-white font-semibold py-2 rounded hover:bg-white hover:text-black transition-all-300' onClick={submit}>Update Child</button>
      </div>

    </div>
  )
}

export default UpdateChild
 
