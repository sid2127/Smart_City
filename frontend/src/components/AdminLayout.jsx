import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar (ALWAYS visible) */}
      <AdminNavbar />

      {/* Dynamic Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;