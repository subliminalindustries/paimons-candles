import React from "react";
import Layout from "./Layout";

import './App.css';

let latLngUpdateListening = false;

document.addEventListener('mapClickedAt', (e) => {
    document.querySelector('#lat-input').value = e.detail.lat;
    document.querySelector('#lon-input').value = e.detail.lng;
    latLngUpdateListening = false;
});

const App = () => {
  return (
    <div className="App">
      <span className="App-header-container">
        <header className="App-header">
          <span className="App-header-icon"></span>
          <span className="App-organisation">&nbsp;Subliminal Industries</span> | <span className="App-name">Paimon's Candles</span> |
        </header>
        <span className="spacer"></span>
          Home:&emsp;
        <span className="latlon-input">
          <label for="lat-input">Latitude:&nbsp;</label>
          <input readonly="true" className="latlon-input-text" type="text" id="lat-input"/>
          &emsp;
          <label for="lon-input">Longitude:&nbsp;</label>
          <input readonly="true"  className="latlon-input-text" type="text" id="lon-input"/>
          &emsp;
          <button onClick={() => { latLngUpdateListening = true}} id="choose-lat-lon">Choose on map..</button>
        </span>
      </span>
      <Layout className="Layout"/>
    </div>
  )
}

export default App;
