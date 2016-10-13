// Dependencies
import React from 'react';

// Assets
import logoImg from '../../assets/img/logo.png';

// Styles
import './Header.scss';

function Header() {
  return (
    <header>
      <a>
        <img src={logoImg} className="brand-logo" alt="Drone Delivery Logo" />
      </a>
    </header>
  );
}

export default Header;
