import { Link, useLocation } from "react-router-dom";


const AdminNavbar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Pending Complaints", path: "/", icon: "📥" },
    { name: "All Complaints", path: "/complaints", icon: "📋" },
    { name: "Officers", path: "/officers", icon: "👨‍💼" },
    { name: "Add Officer", path: "/create-officer", icon: "➕" },
  ];

  return (
    <div className="flex flex-col justify-between w-64 h-screen bg-gray-900 text-white p-5">

      {/* Top Section */}
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center">
          Admin Panel
        </h1>

        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition ${
                  pathname === item.path
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section (Logout) */}
      <div>
        <button
          onClick={() => {
            // Handle logout logic here

          }}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;