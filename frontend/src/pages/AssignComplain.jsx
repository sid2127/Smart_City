import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { removePendingComplaint } from "../redux/complaintSlice";

function ComplaintDetails() {
  const { id } = useParams();

  const allComplaints = useSelector((state) => state.complaint.pendingComplaints);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get complaint (Redux + fallback API)
  useEffect(() => {
    const found = allComplaints.find((c) => c.id === Number(id));

    if (found) {
    setComplaint(found);
     fetchOfficers(found.id);
    
     }
    }, [id])


  // ✅ Fetch officers with workload
  const fetchOfficers = async (complaintId) => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/v1/user/getOfficersByComplaint/${complaintId}`,
           {withCredentials: true}
      );

      console.log(res);
      
      setOfficers(res.data.officers);
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data);
      
    }
  };

  // ✅ Assign handler
  const handleAssign = async (officerId) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/v1/complaint/assignComplaint/${id}/${officerId}`,
        {},
        {withCredentials: true}
      );

      console.log(res);
      

      alert("✅ Complaint Assigned Successfully");

      // Optional: update UI
      setComplaint((prev) => ({
        ...prev,
        status: "assigned",
      }));

      dispatch(removePendingComplaint(Number(id)));
      navigate("/admin");

    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      
      alert("❌ Error assigning complaint");
    } finally {
      setLoading(false);
    }
  };

  if (!complaint) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Content */}
      <div className="flex-1 p-6">

        {/* Complaint Info */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {complaint.title}
          </h1>

          <p className="text-gray-600 mb-3">
            {complaint.description}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>📍 {complaint.address}</p>
            <p>🏷 Department: {complaint.department}</p>
          </div>

          <p className="mt-3 font-semibold text-yellow-600">
            Status: {complaint.status}
          </p>

          {complaint.image_url && (
            <img
              src={complaint.image_url}
              alt="complaint"
              className="mt-4 w-64 rounded border"
            />
          )}
        </div>

        {/* Officers Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Assign to Officer
          </h2>

          {officers.length === 0 ? (
            <p>No officers available</p>
          ) : (
            <div className="grid gap-4">
              {officers.map((officer) => (
                <div
                  key={officer.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">
                      {officer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Assigned Tasks: {officer.activeComplaints || 0}
                    </p>
                  </div>

                  <button
                    disabled={loading}
                    onClick={() => handleAssign(officer.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ComplaintDetails;