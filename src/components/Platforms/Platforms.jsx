import React, { Fragment } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Platforms() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  )
}

export default Platforms