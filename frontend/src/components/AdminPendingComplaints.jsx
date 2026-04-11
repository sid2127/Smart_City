import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminPendingComplaints() {
 const navigate = useNavigate();

  const pendingComplaints = useSelector(
    (state) => state.complaint.pendingComplaints
  );

  return (
      <>
      <div className="flex-1 p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Pending Complaints
          </h1>

          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Total: {pendingComplaints.length}
          </span>
        </div>

        {/* Empty State */}
        {pendingComplaints.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 text-lg">
            No pending complaints 🚫
          </div>
        ) : (
          <div className="grid gap-5">
            {pendingComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white p-5 rounded-xl shadow-md flex gap-5 items-start hover:shadow-lg transition"
              >
                
                {/* LEFT CONTENT */}
                <div className="flex-1">
                  
                  {/* Title */}
                  <h2 className="text-lg font-semibold mb-1">
                    {complaint.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-2">
                    {complaint.description}
                  </p>

                  {/* Meta Info */}
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>📍 {complaint.address || "No address"}</p>
                    <p>🏷 Department: {complaint.department}</p>
                  </div>

                  {/* Status */}
                  <p className="mt-2 font-semibold text-yellow-500">
                    Pending
                  </p>

                  {/* ACTION BUTTON */}
                  <button
                    onClick={() =>
                      navigate(`/admin/complaint/${complaint.id}`)
                    }
                    className="mt-3 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View / Assign
                  </button>
                </div>

                {/* RIGHT IMAGE */}
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
  );
}

export default AdminPendingComplaints