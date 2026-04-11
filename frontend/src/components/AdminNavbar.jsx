import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { name: "Pending Complaints", path: "/admin", icon: "📥" },   // DEFAULT PAGE
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Assigned Complaints", path: "/admin/assigned-complaints", icon: "📋" },
    { name: "Officers", path: "/admin/officers", icon: "👨‍💼" },
    { name: "Add Officer", path: "/admin/create-officer", icon: "➕" },
  ];

  return (
    <div className="flex flex-col justify-between w-64 h-screen bg-gray-900 text-white p-5">
      
      {/* Top */}
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

      {/* Bottom */}
      <button
        onClick={() => {
          // TODO: logout logic
        }}
        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-600 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default AdminNavbar;