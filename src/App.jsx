import React from 'react'
import { toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';
import Sessions from './pages/Sessions';


function App() {
  return (
    <>
    <toaster/>
    <Routes>
      <Route path= "/login" element={<Login mode="login"/>} />

      <Route path= "/register" element={<Login mode="register"/>} />

      {/* private Routes */}
      <Route element={<ProtectedRoute/>}>
      <Route element={<ProtectedLayout/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/sessions' element={<Sessions/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      </Route>
      <Route path='/meeting/:meetingId' element={<MeetingRoom/>}/>
      </Route>
      {/* other Routes */}
      <Route path='*' element={<Navigate to={'dashboard'} replace />}/>

    </Routes>

  
    </>
  )
}

export default App