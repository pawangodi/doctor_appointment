import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(null);

    // Getting Doctors using API
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            console.log("getdata" , data)
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Getting User Profile through API
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("loaduserProfiledata" , data)

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
            loadUserProfileData();
    }, [token]);

    const value = {
        doctors,
        getDoctorsData, // ✅ Fixed Typo
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

// ✅ Added Missing Closing Bracket
export default AppContextProvider;