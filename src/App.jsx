import React from 'react'
import { toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';


function App() {
  return (
    <>
    <toaster/>
    <Routes>
      <Route path= "/login" element={<Login mode="login"/>} />
      <Route path= "/register" element={<Login mode="register"/>} />

    </Routes>

  
    </>
  )
}

export default App