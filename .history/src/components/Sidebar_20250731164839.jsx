import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
        <NavLink to={"/"} style={(isA)}>
            Home</NavLink></div>
  )
}

export default Sidebar