import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <>
      <Dashboard />
      <ToastContainer >
      </>

      )
}export default App;