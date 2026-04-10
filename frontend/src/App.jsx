import { useState } from 'react'
import Signup from './pages/signup'
import Login from './pages/login'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import useGetUserDetails from './hooks/useGetUserDetails';
import CreateComplaint from './pages/CreateComplaint';
import useGetAllComplaints from './hooks/useGetAllComplaints';

function App() {

  useGetUserDetails();
  useGetAllComplaints();

  const user = useSelector(state => state.user.userInfo);
  const loading = useSelector(state => state.user.isLoading);

  if(loading){
    return <div className='w-full min-h-screen flex justify-center item center text-4xl font-bold'>Loading...</div>
  }

  return (   
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to='/signup' />} />

      <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />

      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />

      <Route path='/create' element={user ? <CreateComplaint /> : <Navigate to='/login' />} />
    </Routes>
  );
}


export const serverUrl = import.meta.env.VITE_SERVER_URL;
export default App
