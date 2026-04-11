import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";
import { serverUrl } from "../App";

function Login() {
    //   const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post(`${serverUrl}/api/v1/user/login`,
                form,
                {withCredentials: true}
            );

            console.log(result);
            dispatch(setUserDetails(result.data.user));
            setLoading(false);
            navigate('/');

        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("MESSAGE:", error.message);
            console.log("RESPONSE:", error.response);
            setLoading(false);
        }
    }

    //   ''
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-95">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    Smart City
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Signup
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;