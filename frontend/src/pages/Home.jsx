import React from 'react'
import Navbar from '../components/userNavbar'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard';
import OfficerDashboard from '../components/OfficerDashboard';
import AdminDashboard from '../components/AdminDashboard';

function Home() {

    const user = useSelector(state => state.user.userInfo);

  return (
    <>
    {user?.role === "user" ? (
        <UserDashboard />
    ) : user?.role === "officer" ? (
        <OfficerDashboard />
    ): <AdminDashboard />}
    </>
  )
}

export default Home