import React, { useContext, useState } from 'react'
import { NavLink, useNavigate , Link} from "react-router-dom";
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

// react icons 
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(true)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <header className="w-full border-b-2 border-gray-200">
      <nav className=" w-full custom_screen-max-width flex justify-between  items-center py-5 !important  ">
        <Link to="/">
          <p className="text-2xl font-bold ">beby_&tep</p>
        </Link>
        <ul className="flex flex-1 justify-center max-sm:hidden gap-5 ">
          <li className="font-semibold cursor-pointer text-gray-500 hover:text-gray-700 ">
            <NavLink to="/">HOM</NavLink>
          </li>
          <li className="font-semibold cursor-pointer text-gray-500 hover:text-gray-700 ">
            <NavLink to="/doctors">DOCTORS</NavLink>
          </li>
          <li className="font-semibold cursor-pointer text-gray-500 hover:text-gray-700 ">
            <NavLink to="/about">ABOUT</NavLink>
          </li>
          <li className="font-semibold cursor-pointer text-gray-500 hover:text-gray-700 ">
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
        </ul>

        <div className='flex items-center gap-4 '>
        {
          token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-1/2 h-1/3' : 'h-0 w-0'} right-0 top-0  z-20 overflow-hidden bg-white transition-all duration-150`}>

          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 ml-auto py-3 ' alt="" />

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium '>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2  inline-block hover:font-bold'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2  inline-block hover:font-bold'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 inline-block hover:font-bold'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2  inline-block hover:font-bold'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
      </nav>
    </header>
  );
};

export default Navbar;
