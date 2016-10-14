import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // required
import 'react-toolbox/lib/commons.scss';

import App from './components/app/App.jsx';

import styles from './index.scss';

function renderApp() {
  const appElement = document.getElementById('main');
  appElement.className = styles.main;

  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    appElement
  );
}

renderApp(); // Renders App on init

if (module.hot) {
  // Renders App every time a change in code happens.
  module.hot.accept('./components/app/App.jsx', renderApp);
}
