import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import DoctorCard from '../components/DoctorCard'

const Doctors = () => {
  const {doctors} = useContext(AppContext)
  const navigate = useNavigate();


  return (
    
    <div >
      <div className='custom_screen-max-width my-10'>
          <h1 className='sm:text-2xl md:text-3x lg:text-4xl text-center font-semibold  '>Our Experiance Doctor's</h1>
          <hr className='animate_hr_line w-20 h-4 mx-auto text-gray-500 mt-2'/>

          {/* {---------------All doctors---------} */}
          <div className='flex  flex-wrap justify-center gap-4'>
          {
            doctors.map((each_doc , index)=>( 
              <DoctorCard
              key={index}
              doctor_info={each_doc}
            />
            ))  
          }
          </div>

      </div>
    </div>
  )
}

export default Doctors
