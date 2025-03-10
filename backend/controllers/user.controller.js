import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

import userModel from "../models/user.model.js";
import doctorModel from "../models/doctor.model.js";
import appointmentModel from "../models/appointment.model.js";

import { v2 as cloudinary } from 'cloudinary'


// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        console.log(name , email , password)

        // validating required field 
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // password validation with length
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password length > 7" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.status(201).json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for updating user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for book appointment 
const bookAppointment = async (req, res) => {

    try {
         
        const { userId, docId, slotDate, slotTime } = req.body
        
         //  Find doctor data (excluding password)
        const docData = await doctorModel.findById(docId).select("-password")
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor Not Found" });
        }

        //️ Check if doctor is available
        if (!docData.available) {
            return res.status(400).json({ success: false, message: 'Doctor Not Available' })
        }

        // Make  Clone of slots_booked 
        const slots_booked = { ...docData.slots_booked };
        
        // checking for slot availablity  
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = []; // Initialize array if date doesn't exist 
        } 
         //check slots existance
        if (slots_booked[slotDate].includes(slotTime)) {
            return res.status(400).json({ success: false, message: "Slot Not Available" });
        }

        //  Add the new slot to the booked slots
        slots_booked[slotDate].push(slotTime);

        //  Find user data (excluding password)
        const userData = await userModel.findById(userId).select("-password")
        if (!userData) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        
         //  Save the new appointment
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.status(201).json({ success: true, message: 'Appointment Booked Successfully' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }

}

// API for cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //After cancele the appointment we need to update Doctor booked_slots

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        
        //updating doctor slot_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to fetch all appointment by userId
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment
}