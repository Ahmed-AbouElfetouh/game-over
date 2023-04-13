import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logoImage from './../../assets/images/logo.png';
import './Navbar.module.css';
import styles from './Navbar.module.css';

function Navbar({ userData, handelLogOut }) {
  
  function showList() {
    document.querySelector('.test_class').classList.toggle(`${styles.show}`);
  }
  
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link
            className={`navbar-brand text-white d-flex align-items-center`}
            to="/"
          >
            <img src={logoImage} alt="Logo" width={70} height={46}></img>
            <p className={styles.special}>Game Over</p>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link active text-white`}
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-white`}
                    aria-current="page"
                    to="/all-games"
                  >
                    All
                  </Link>
                </li>
                <li
                  className={`nav-item ${styles.handel_LI}`}
                  onClick={showList}
                >
                  <Link className={`nav-link text-white`} aria-current="page">
                    Platforms{' '}
                    <i
                      className="fa-solid fa-sort-down"
                      style={{ color: '#ffffff' }}
                    ></i>
                  </Link>
                  <ul
                    className={`test_class list-unstyled text-white ${styles.handel_UL}`}
                  >
                    <li>
                      <Link
                        to={`/platforms/pc`}
                        className="text-decoration-none text-black"
                      >
                        Pc
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/platforms/browser`}
                        className="text-decoration-none text-black"
                      >
                        Browser
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : null}

            <ul
              className={`navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center `}
            >
              {userData === null ? (
                <Fragment>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${styles.login_btn}`}
                      aria-current="page"
                      to="login"
                    >
                      LogIn
                    </Link>
                  </li>
                  <li className={`nav-item`}>
                    <Link
                      className={`nav-link ${styles.handel_btns}`}
                      aria-current="page"
                      to="register"
                    >
                      Join Free
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item" onClick={handelLogOut}>
                    <Link
                      className={`nav-link ${styles.handel_btns}`}
                      aria-current="page"
                    >
                      LogOut
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
