import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // required

import Layout from './components/layout/Layout.jsx';

import './index.scss';

function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <Layout />
    </AppContainer>,
    document.getElementById('main')
  );
}

renderApp(); // Renders App on init

if (module.hot) {
  // Renders App every time a change in code happens.
  module.hot.accept('./components/app/App.jsx', renderApp);
}
