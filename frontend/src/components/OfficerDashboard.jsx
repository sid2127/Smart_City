import React from 'react'
import AdminNavbar from './AdminNavbar'
import Navbar from './userNavbar'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { serverUrl } from '../App';

function OfficerDashboard() {

  const complaints = useSelector(state => state.user.complaints);

  const updateStatus = async (e, complaintId) => {
    try {
      const res = await axios.put(`${serverUrl}api/v1/complaint/updateStatus/${complaintId}/${e.target.value}`,
        {},
        {withCredentials: true}
      )

      console.log(res);
      
      
    } catch (error) {
      console.log("error" , error);
      console.log(error.response.data);
      
      
    }
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pending Complaints</h1>

        {complaints.length === 0 ? (
          <p>No complaints Are Pending</p>
        ) : (
          <div className="grid gap-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="p-4 border rounded-lg shadow flex gap-4 items-start"
              >

                {/* LEFT: TEXT */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {complaint.title}
                  </h2>

                  <p className="text-gray-600">
                    {complaint.description}
                  </p>

                  <p className="text-sm mt-2">
                    📍 {complaint.address}
                  </p>

                  <p className="text-sm">
                    🏷 {complaint.department}
                  </p>

                  <p className="text-sm font-semibold mt-2">
                    Status:{" "}
                    <span className={
                      complaint.status === "pending"
                        ? "text-yellow-500"
                        : complaint.status === "resolved"
                          ? "text-green-500"
                          : "text-blue-500"
                    }>
                      {complaint.status}
                    </span>
                  </p>

                  <div className="w-44">
                    <h1 className='font-bold text-red-500'>Change Status</h1>
                  <select
                    className="border p-2 rounded w-full"
                    onChange={(e) => updateStatus(e, complaint.id)}
                  >
                    <option value="">Change</option>
                    <option value="in_progress">In-Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                </div>

                {/* RIGHT: IMAGE */}
                {complaint.image_url && (
                  <div className="w-40 h-32 shrink-0">
                    <img
                      src={complaint.image_url}
                      alt="complaint"
                      className="w-full h-full object-contain rounded-lg border"
                    />
                  </div>
                )}

    
              </div>
            ))}
          </div>
        )}
      </div>
    </>

  )
}

export default OfficerDashboard;