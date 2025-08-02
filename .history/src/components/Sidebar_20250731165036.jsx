import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
        <NavLink to="/" style={isActive ? `bg-red-500` : ""}>
            Home</NavLink></div>
        <NavLink to="/" style={isActive ? `bg-red-500` : ""}>
            Home</NavLink></div>
        <NavLink to="/" style={isActive ? `bg-red-500` : ""}>
            Home</NavLink></div>
  )
}

export default Sidebar