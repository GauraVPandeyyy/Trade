import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div className='text-center bg-gray-950 re'>
      <div className='absolute'>
        <Sidebar />
      </div>
      <Outlet />
      <h1>hello from h1</h1>
    </div>
  )
}

export default App