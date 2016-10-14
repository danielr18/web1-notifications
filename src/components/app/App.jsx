// Dependencies
import React from 'react';

// Styles
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="box box-1">
          5
        </div>
        <div className="box box-2">
          6s
        </div>
      </div>
    );
  }
}

export default App;
