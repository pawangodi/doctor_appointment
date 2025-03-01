import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-full bg-linear-to-r from-gray-50 to-pink-300 '>
      <div className='custom_screen-max-width h-[90vh] flex max-sm:p-5 max-sm:flex-col flex-row justify-between items-center '>
        {/* {-------------left Part------------} */}
        <div className='max-sm:w-full max-sm:text-left order-2  md:order-1 m w-1/2 h-full flex flex-col justify-center '>
          <p className='text-3xl md:text-5xl font-[1000] leading-18 mb-4'>
            Bringing <span className=' text-pink-400'> Joy </span> <br /> &
            <span className='text-pink-400'> Care </span>
            to <span className='text-pink-400'> Pregnancy </span> <br />That's our
            <span className='text-yellow-00'> Success...</span>
          </p>
          <div className=' flex items-center mt-4'>
            <button
              onClick={() => {
                navigate("/doctors");
              }}
              className="w-[12em] px-4 py-4  rounded-md bg-indigo-400 text-white font-bold hover:bg-indigo-500 hover:trasition-all duration-300 cursor-pointer flex items-center gap-2 "
            >
              Get Appointment
              <FaLongArrowAltRight  className='w-4 '/>
            </button></div>
        </div>

        {/* {right part} */}
        <div className='max-sm:w-90  order-1 md:order-2 w-1/2  flex items-center '>
          <img className='custom_animate_image rounded-medium' src='./images/banner_hero_section.jpg' alt="care_image" />
        </div>
      </div>
    </div>
  )
}

export default Hero
