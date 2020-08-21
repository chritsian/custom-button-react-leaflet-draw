import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapDraw from './components';

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      <MapDraw/>
    </div>
  );
}

export default App;
