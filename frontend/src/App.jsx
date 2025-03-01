import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import './index.css'

const App = () => {
  return (
    <div className="px-3 md:px-5 lg:px-10 w-{100%} ">
    <ToastContainer />
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
     <Footer /> 
    </div>
  );
};

export default App;
