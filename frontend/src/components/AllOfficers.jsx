import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";

function AllOfficers() {
  const [off, setOff] = useState([]);

  const officers = useSelector((state) => state.officer.officers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (officers && officers.length > 0) {
      setOff(officers);
    } else {
      const getOfficers = async () => {
        try {
          const res = await axios.get(
            `${serverUrl}api/v1/user/getAllOfficers`,
            { withCredentials: true }
          );

          setOff(res.data.officers);
        } catch (error) {
          console.log(error);
        }
      };

      getOfficers(); // ⚠️ YOU FORGOT THIS CALL
    }
  }, [officers]);


  const deleteOfficer = async (id) => {
    try {
      const res = await axios.delete(
        `${serverUrl}api/v1/user/removeOfficer/${id}`,
        { withCredentials: true }
      );
      console.log(res.data);
      useDispatch(deleteOfficer(id));

    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        All Officers
      </h1>

      {off.length === 0 ? (
        <p className="text-gray-600">No officers found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {off.map((officer) => (
            <div
              key={officer.id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  {officer.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {officer.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {officer.email}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>🏢 Department:</strong> {officer.department || "N/A"}</p>
                <p><strong>📅 Joined:</strong> {new Date(officer.created_at).toLocaleDateString()}</p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  View Tasks
                </button>

                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600" onClick={()=> deleteOfficer(off.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOfficers;