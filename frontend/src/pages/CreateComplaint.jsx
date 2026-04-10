import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

function CreateComplaint() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "Low",
        image: null
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("department", form.category);
            formData.append("address", form.location);
            formData.append("priority", form.priority);
            if (form.image) formData.append("image", form.image);

            await axios.post(`${serverUrl}api/v1/complaint/createComplaint`, 
                formData, 
                {withCredentials: true});

            alert("Complaint submitted successfully!");
            navigate("/");

        } catch (error) {
            console.log(error);
            console.log("Error response" , error.response?.data);
            
            alert("Error submitting complaint");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-blue-100">

            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-100 flex flex-col gap-4"
            >

                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Raise a Complaint
                </h2>

                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Complaint Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-lg"
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Describe your issue..."
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-lg"
                />

                {/* Category */}
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-lg"
                >
                    <option value="">Select Category</option>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Other">Other</option>
                </select>

                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-lg"
                />

                {/* Priority */}
                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="p-2 border rounded-lg"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                {/* Image Upload */}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="p-2 border rounded-lg"
                />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    {loading ? "Submitting..." : "Submit Complaint"}
                </button>

            </form>
        </div>
    );
}

export default CreateComplaint;