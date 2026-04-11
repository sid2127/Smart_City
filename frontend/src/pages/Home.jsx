import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector(state => state.user.userInfo);

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") return <Navigate to="/admin" />;
  if (user.role === "officer") return <Navigate to="/officer" />;
  if (user.role === "user") return <Navigate to="/user" />;

  return null;
}

export default Home;