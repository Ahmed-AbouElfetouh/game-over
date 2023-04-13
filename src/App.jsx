import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AllGames from './components/AllGames/AllGames';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import { Fragment, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import GameDetails from './components/gameDetails/gameDetails';
import Platforms from './components/Platforms/Platforms';
import PcPlatform from './components/PcPlatform/PcPlatform';
import BrowserPlatform from './components/BrowserPlatform/BrowserPlatform';

function App() {
  const [userData, setUserData] = useState(null);

  function getUserData() {
    let encodedToken = localStorage.getItem('userTokken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem('userTokken') !== null) {
      getUserData();
    }
  }, []);
  const paths = createBrowserRouter([
    {
      path: '',
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        { path: '', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'all-games', element: <AllGames /> },
        { path: 'login', element: <LogIn getUserData={getUserData} /> },
        { path: 'register', element: <Register /> },
        { path: 'gameDetails/:id', element: <GameDetails /> },
        {
          path: 'platforms',
          element: <Platforms />,
          children: [
            { path: 'pc', element: <PcPlatform /> },
            { path: 'browser', element: <BrowserPlatform /> },
          ],
        },
      ],
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={paths} />
    </Fragment>
  );
}

export default App;
