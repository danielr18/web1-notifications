// Dependencies
import React from 'react';

// Components
import Header from '../header/Header.jsx';
import App from '../app/App.jsx';
import Footer from '../footer/Footer.jsx';

// Styles
import './Layout.scss';

function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <App />
      <Footer />
    </div>
  );
}

export default Layout;
