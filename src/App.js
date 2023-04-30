<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios';
=======
import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";
import screen1 from "./screen1";
import AllRoutes from "./AllRoutes"
import MarkRoutes from "./MarkRoutes"
>>>>>>> Stashed changes




function App() {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.8674);
  const [lat, setLat] = useState(34.8818);
  const [zoom, setZoom] = useState(9);
  const [routes, setRoutes] = useState([]);
  const [waypoints, setWaypoints] = useState([]);


  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });//.addControl(directions, 'top-left');

    const customPoints = [
      { name: 'Point A', coordinates: [-117.8674, 34.8818] },
      { name: 'Point B', coordinates: [-118.8674, 35.8818] },
      { name: 'Point C', coordinates: [-116.8674, 33.8818] }
    ];

    var start = [-117.88476,34.89784];
    var end = [-117.74270,34.84688];

//     customPoints.forEach((point, index) => {
//       const marker = new mapboxgl.Marker()
//         .setLngLat(point.coordinates)
//         .addTo(map.current);
// });

    var apiReq = `https://api.mapbox.com/directions/v5/mapbox/driving/`;

    /*

    -117.8674%2C34.8818%3B
    -118.8674%2C35.8818%3B
    -116.8674%2C33.8818

    */


    customPoints.forEach((point, index) => {
      apiReq += point.coordinates[0] + '%2C' + point.coordinates[1] + '%3B';
    });
    apiReq=apiReq.slice(0,-3);

    apiReq += `?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;

    
    const getData = async () => {
      await axios.get(
      apiReq)
      //`https://api.mapbox.com/directions/v5/mapbox/driving/${customPoints[0].coordinates[0]},${customPoints[0].coordinates[1]};${customPoints[1].coordinates[0]},${customPoints[1].coordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`)
      .then(response => {
        routes.push((response.data.routes)); 
        waypoints.push((response.data.waypoints));
        console.log(response.data);
        console.log(routes);
        console.log(waypoints);
      });
    }

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      routes: routes,
      waypoints: waypoints 
    });

    getData();

    map.current.addControl(directions, 'top-left');

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    console.log(start,end);

    console.log('waypoints after' + waypoints);

    map.current.on('load', function() {
      directions.setOrigin(waypoints[0]);
      directions.addWaypoint(0,waypoints[1]);
      directions.setDestination(waypoints[2]);
      // directions.setOrigin(start); 
      // directions.addWaypoint(0, [-117.86414,34.73640]);
      // const marker = new mapboxgl.Marker()
      // .setLngLat([-117.86414,34.73640])
      // .addTo(map.current);
      // directions.addWaypoint(1, [-117.97031,34.72134]);
      // directions.setDestination(end);  
    });
  
  
  });
    
  return (
<<<<<<< Updated upstream
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
=======
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen1" element={<screen1 />} />
        <Route path="/allRoutes" element={<AllRoutes />} />
        <Route path="/markRoutes" element={<MarkRoutes/>}/>
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );

  
}

export default App;
