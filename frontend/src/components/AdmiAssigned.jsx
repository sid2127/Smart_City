import React from 'react'
import { useSelector } from 'react-redux'

function AdmiAssigned() {

  const assignedPendingComplaints = useSelector(state => state.complaint.assignedComplaints ) || [];
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Assigned & In-Progress Complaints
      </h1>

      {assignedPendingComplaints?.length === 0 ? (
        <p className="text-gray-600">No complaints found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedPendingComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={complaint.image_url}
                alt="complaint"
                className="w-full h-40 object-cover rounded-xl mb-3"
              />

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800">
                {complaint.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-1">
                {complaint.description}
              </p>

              {/* Info */}
              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p><strong>📍 Address:</strong> {complaint.address}</p>
                <p><strong>🏢 Department:</strong> {complaint.department}</p>
                <p><strong>⚡ Priority:</strong> {complaint.priority}</p>
                <p><strong>👮 Officer:</strong> {complaint.officer_name}</p>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-3 py-1 text-xs rounded-full text-white ${
                    complaint.status === "assigned"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                >
                  {complaint.status}
                </span>

                <span className="text-xs text-gray-500">
                  {new Date(complaint.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdmiAssigned;