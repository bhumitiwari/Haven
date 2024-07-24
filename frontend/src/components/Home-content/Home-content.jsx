import React from 'react';
import { Link } from 'react-router-dom';
const HomeContent = () => {
    return (
        <div className=' md:flex-row flex flex-col px-6 py-20 h-auto'>
            <div className='w-full lg:w-3/6 lg:items-start flex flex-col  items-center justify-center'>
            <h1 className='lg:text-6xl text-4xl font-semibold text-center lg:text-left pt-20 '>A chance to complete the incomplete..</h1>
                <p className='mt-4 text-xl lg:text-left text-center '>Open your Heart! Open your Home. Find your Family today! </p>
                <p className='tag mt-4 lg:text-2xl text-xl lg:text-left text-center'>#Making Lifelong Connections</p>
                <Link to="/all-profiles" ><button className=" bg-[#ef9273] mt-4 text-black w-32 rounded-full h-12 hover:shadow-2xl hover:shadow-black hover:border-black hover:border-2  ">Explore Profiles</button></Link></div>
            <div className=' lg:w-3/6 full'><img className="lg:h-[60vh] h-[40vh] sm:h-10 lg:w-[300px] lg:ml-60 rounded-3xl w-[60vw] ml-[15vw] mt-2" src="./home.jpg" alt=""></img></div>
            </div>
    )
}

export default HomeContent;