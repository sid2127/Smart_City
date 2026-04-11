import { useState } from 'react'
import Signup from './pages/signup'
import Login from './pages/login'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import useGetUserDetails from './hooks/useGetUserDetails';
import CreateComplaint from './pages/CreateComplaint';
import useGetAllComplaints from './hooks/useGetAllComplaints';
import AdminLayout from './components/AdminLayout';
import UserDashboard from './components/UserDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import CompletComplaints from './components/CompletComplaints';
import AdminPendingComplaints from './components/AdminPendingComplaints';
import AdminDashboard from './components/AdminDashboard'
import AdminAssigned from './components/AdmiAssigned';
import AdminOfficers from './components/AllOfficers';
import OfficerLayout from './components/OfficerLayout';
import CreateOfficers from './components/CreateOfficers';
import AllOfficers from './components/AllOfficers';
import AssignComplain from './pages/AssignComplain';
import AdmiAssigned from './components/AdmiAssigned';

function App() {

  useGetUserDetails();
  useGetAllComplaints();

  const user = useSelector(state => state.user.userInfo);
  const loading = useSelector(state => state.user.isLoading);

  if (loading) {
    return <div className='w-full min-h-screen flex justify-center item center text-4xl font-bold'>Loading...</div>
  }

  return (
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to='/signup' />} />

      <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />

      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />

       //Admin Routes
      <Route path='/admin' element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to={'/'} />}>
        <Route index element={<AdminPendingComplaints />} />
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='assigned-complaints' element={<AdmiAssigned />} />
        <Route path='officers' element={<AllOfficers />} />
        <Route path='create-officer' element={<CreateOfficers />} />
      </Route>

      <Route path='/admin/complaint/:id' element={user?.role === 'admin' ? <AssignComplain /> : <Navigate to={'/'}/>}   />

      //User Routes 
      <Route path='/user' element={user?.role === 'user' ? <UserDashboard /> : <Navigate to='/' />} />
      <Route path='/create-complaint' element={user?.role === 'user' ? <CreateComplaint /> : <Navigate to='/' />} />

      //Officer Routes
      <Route path='/officer' element={user?.role === 'officer' ? <OfficerLayout /> : <Navigate to='/' />} >
        <Route index element={<OfficerDashboard />} />
        <Route path='completed' element={<CompletComplaints />} />
      </Route>
    </Routes>
  );
}


export const serverUrl = import.meta.env.VITE_SERVER_URL;
export default App
