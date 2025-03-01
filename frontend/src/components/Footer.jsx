import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className=''>
            <div className='w-full pt-20 '>
                <h1 className='sm:text-xl  text-center font-semibold text-pink-500 italic '>"Caring hands, loving hearts – Nurturing your little one with compassion and expertise."</h1>
                <hr className='animate_hr_line w-20 h-4 mx-auto text-pink-500 mt-2'/>

                {/* {----------3 Section Footer-----------} */}
                <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10   text-sm'>

                    <p className='w-full md:w-2/3 text-gray-600 leading-6 italic'>At <span className='sm:text-2xl md:text-3xl lg:text-4xl'>beby_&tep</span>, we are dedicated to providing the highest quality care for your little ones with compassion, expertise, and love. Our team of experienced pediatricians and nurses ensures a safe and nurturing environment for newborns, infants, and children. From specialized neonatal care to routine checkups, we are here to support your child's health and well-being every step of the way. Your baby's health is our priority, and we are honored to be a part of their journey. Because every baby deserves the best start in life.</p>

                    <div className='group'>
                        <p className='text-xl font-medium mb-5 text-gray-600'>COMPANY INFO</p>
                        <ul className='flex flex-col gap-2 text-gray-600 '>
                            <li className='hover:font-bold'>Servicess</li>
                            <li className='hover:font-bold'>About us</li>
                            <li className='hover:font-bold'>Carrear</li>
                            <li className='hover:font-bold'>Privacy policy</li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-medium mb-5'>CONTACT US</p>
                        <ul className='flex flex-col gap-2 text-gray-600'>
                            <li>+91-312-567-7676</li>
                            <li><a className='text-blue-500' href='https://www.linkedin.com/in/pawan-godi/'>@pawan_godi/linkdin</a></li>
                        </ul>
                    </div>

                </div>

                <div>
                    <hr />
                    <p className='py-5 text-sm text-end'>Design by<a className='text-blue-500' href='https://www.linkedin.com/in/pawan-godi/'>@pawan_godi/linkdin</a></p>
                </div>
            </div>
        </div>
    )
}

export default Footer
