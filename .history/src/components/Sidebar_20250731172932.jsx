import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <div className='bg-blue-500 w-full abs'>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "bg-red-500" : ""}>
                Home
            </NavLink>
            <NavLink 
                to="/inv-fund" 
                className={({ isActive }) => isActive ? "bg-red-500" : ""}>
                Inv Fund
            </NavLink>
            <NavLink 
                to="/promotion" 
                className={({ isActive }) => isActive ? "bg-red-500" : ""}>
                Promotion
            </NavLink>
        </div>
    )
}

export default Sidebar