import React from "react";
import Layout from "./Layout";

import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <span className="App-organisation">Subliminal Industries</span> | <span className="App-name">Raydome</span>
      </header>
      <Layout className="Layout"/>
    </div>
  )
}

export default App;
