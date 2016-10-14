// Dependencies
import React from 'react';

// Components
import Header from '../header/Header.jsx';
import Content from '../content/Content.jsx';
import Footer from '../footer/Footer.jsx';

// Styles
import styles from './App.scss';

function App() {
  return (
    <div className={styles.siteWrapper}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
