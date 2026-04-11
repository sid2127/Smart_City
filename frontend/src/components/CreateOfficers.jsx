import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { serverUrl } from "../App";

function CreateOfficer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const departments = [
    { label: "Water", value: "water" },
    { label: "Electricity", value: "electricity" },
    { label: "Road", value: "road" },
    { label: "Sanitation", value: "sanitation" },
    { label: "Public Safety", value: "public_safety" },
  ];

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/v1/user/createOfficer`,
        form,
        { withCredentials: true }
      );

      console.log(res);
      
      alert("✅ Officer created and email sent");
  

      setForm({
        name: "",
        email: "",
        department: "",
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Create Officer
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow w-full max-w-md"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Officer Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Officer Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          {/* Department */}
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Officer"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateOfficer;