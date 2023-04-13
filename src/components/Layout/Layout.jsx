import React, { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout({ userData, setUserData }) {
  let navigate = useNavigate();

  function handelLogOut() {
    localStorage.removeItem('userTokken');
    setUserData(null);
    navigate('/login');
  }
  return (
    <Fragment>
      <Navbar handelLogOut={handelLogOut} userData={userData} />
      <Outlet />
    </Fragment>
  );
}

export default Layout;
