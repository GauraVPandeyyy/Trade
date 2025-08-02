import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
    <div>
        <NavLink to="/" style={isActive ? `bg-red-500` : ""}>
            Home</NavLink></div>
        <NavLink to="/inv-fund" style={isActive ? `bg-red-500` : ""}>
            Inv</NavLink></div >
        <NavLink to="/promotion" style={isActive ? `bg-red-500` : ""}>
Promotion</NavLink>
            </div >
  )
}

export default Sidebar