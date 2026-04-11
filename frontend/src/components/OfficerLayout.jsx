import React from 'react'
import Navbar from './OfficerNavbar'
import { Outlet } from 'react-router-dom'
import OfficerDashboard from './OfficerDashboard'

function OfficerLayout() {
  return (
    <>
      <Navbar />
      <OfficerDashboard />

    </>
  )
}

export default OfficerLayout