import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div className='text-center bg-gray-950 relative'>
      <div className='absolute top-0 left-0 bottom-0'>
        <Sidebar />
      </div>
      <Outlet />
      <h1>hello from h1</h1>
    </div>
  )
}

export default App