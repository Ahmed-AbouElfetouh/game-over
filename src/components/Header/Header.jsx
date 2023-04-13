import React,  { Fragment } from 'react';
import './Header.css'

function Header() {
  return (
    <Fragment>
      <div className={`header`}>
        <div className="container">
          <div className="header-content">
            <h1>
              Find & track the best <span>free-to-play </span> games!
            </h1>
            <p>
              Track what you've played and search for what to play next! Plus
              get free premium loot!
            </p>
            <button>Browse Games</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header