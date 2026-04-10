import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e)=> {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post(`${serverUrl}api/v1/user/signup`,
                form,
                {withCredentials: true});

            console.log(result);
            dispatch(setUserDetails(result.data.user));
            setLoading(false);
            navigate('/');
            
        } catch (error) {
            console.log("ERROR RESPONSE:", error.response?.data);
            setLoading(false);
        }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-95">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Smart City
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Create your account
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={(e)=> handleSubmit(e)}>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;