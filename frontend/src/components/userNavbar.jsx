import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.userInfo);

    const handleLogout = async() => {
        try {
            const result = await axios.post(`${serverUrl}/api/v1/user/logout`,
                {},
                {withCredentials: true}
            )
    
            console.log(result);
            
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log("ERROR RESPONSE:", error.response?.data);
            console.log("ERROR" , error);
            
        }
    };

    return (
        <div className="flex justify-between items-center px-6 py-3 bg-blue-600 text-white shadow-md">

            {/* Left */}
            <h1 className="text-xl font-bold">Smart City</h1>

            {/* Center */}
            <div className="flex gap-6">
                <Link to="/user" className="hover:underline">All Complaints</Link>
                <Link to="/create-complaint" className="hover:underline">Create Complaint</Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <span>Welcome, {user?.name} 👋</span>
                <button 
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

export default Navbar;