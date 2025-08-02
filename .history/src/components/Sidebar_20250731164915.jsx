import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
        <NavLink to={"/"} style={isActive ? b}>
            Home</NavLink></div>
  )
}

export default Sidebar