import React , {useContext , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const DoctorCard = (props) => {
  const navigate = useNavigate()
const{name , experience , degree , image,_id} = props.doctor_info


  return (
    <div onClick={() => {
      navigate(`/appointment/${_id}`);
      window.scrollTo(0, 0);
    }} className='mt-20 w-1/2.5 border-1 border-gray-300 rounded-lg  transition-transform hover:-translate-y-7  cursor-pointer duration-300 '>
        <div className=' w-full h-60 flex  flex-col justify-center items-center  bg-pink-200 overflow-hidden'>
          <img className="bg-cover h-full hover:scale-130 transition-ease duration-700 " src={image}  alt ="Doctor_pic"/>
        </div>
        <></>
        <div className="p-2 flex flex-col gap-1 mt-2">
          <p className='text-green-500 text-smm md:text-lg'><span className='w-1 h-1 rounded-full bg-green-400 m gap-2'></span> Available</p>
          <p className='text-xl text-gray-700 font-semibold'>{name}</p>
          <p className='text-sm text-gray-700'>Experiance : <span>{experience}</span></p>
        </div>
    </div>
  )
}

export default DoctorCard
