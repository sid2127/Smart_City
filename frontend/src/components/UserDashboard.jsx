import React from 'react'
import Navbar from './userNavbar'
import { useSelector } from 'react-redux'

function UserDashboard() {

    const complaints = useSelector(state => state.user.complaints);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">My Complaints</h1>

                {complaints.length === 0 ? (
                    <p>No complaints found</p>
                ) : (
                    <div className="grid gap-4">
                        {complaints.map((complaint) => (
                            <div
                                key={complaint.id}
                                className="p-4 border rounded-lg shadow flex gap-4 items-start"
                            >

                                {/* LEFT: TEXT */}
                                <div className="flex-1">
                                    <h1> <span className=' font-bold'>#Complaint Id : </span>{complaint.id}</h1>
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

export default UserDashboard