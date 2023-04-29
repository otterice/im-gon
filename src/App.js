import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';




function App() {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');




  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  mapboxgl.accessToken = 'pk.eyJ1IjoiajVkYW5nIiwiYSI6ImNsaDFuMmRxbjE0Z3YzZ3A5cHRjZWQ5Y3EifQ.IkR9le5BaC-yW0tPLReZQg';
  //   map = new mapboxgl.Map({
  //   container: 'map-container',
  //   style: 'mapbox://styles/mapbox/streets-v11'
  // });

  var directions = new MapboxDirections({
    accessToken: 'pk.eyJ1IjoiajVkYW5nIiwiYSI6ImNsaDFuMmRxbjE0Z3YzZ3A5cHRjZWQ5Y3EifQ.IkR9le5BaC-yW0tPLReZQg',
    unit: 'metric',
    profile: 'mapbox/cycling'
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    }).addControl(directions, 'top-left');;
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    

      map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  console.log(map.current);
    
  return (
    <div className="App">
      <header className="App-header">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} style={{ width: "100%", height: "600px" }}></div>
      </header>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css"></link>

    </div>
  );

  
}

export default App;
