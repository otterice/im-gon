import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios';

function AllRoutes() {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');


  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.8674);
  const [lat, setLat] = useState(34.8818);
  const [zoom, setZoom] = useState(9);
  const [routes, setRoutes] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  var directions = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });//.addControl(directions, 'top-left');

    const customPoints = [
      { name: 'Point A', coordinates: [-117.8674,34.8818] },
      { name: 'Point B', coordinates: [-118.8674,35.8818] },
      { name: 'Point C', coordinates: [-118.8694,36.8818] },
      { name: 'Point D', coordinates: [-119.8694,36.8818] },

    ];

    var apiReq = `https://api.mapbox.com/directions/v5/mapbox/driving/`;

    customPoints.forEach((point, index) => {
      apiReq += point.coordinates[0] + '%2C' + point.coordinates[1] + '%3B';
    });
    apiReq=apiReq.slice(0,-3);
    apiReq += `?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;

    const getData = async () => {
      await axios.get(
      apiReq)
      .then(response => {
        routes.push((response.data.routes)); 
        waypoints.push((response.data.waypoints));

        const instructions = document.getElementById('instructions');
        let time = 0;
        let tripInstructions = '';
       
        routes[0].forEach((route) => {
          time += route.duration;
          route.legs.forEach((leg) => {
            leg.steps.forEach((step) => {
              tripInstructions += `<li>${step.maneuver.instruction}</li>`;

              console.log(step.maneuver.instruction);
            })
          })
        });

        instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
          time / 60
        )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;

        directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          controls:{instructions:false}
          
        });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('load', function() {
      directions.setOrigin(waypoints[0][0].location);
      for (let i = 1; i < waypoints[0].length-1; i++) {
      directions.addWaypoint(i, waypoints[0][i].location);
        const marker = new mapboxgl.Marker()
        .setLngLat(waypoints[0][i].location)
        .addTo(map.current);   
      }
      directions.setDestination(waypoints[0][waypoints[0].length-1].location);      
    });
      map.current.addControl(directions, 'top-left');
      });
    }

    getData();
  });
    
  return (
    <div className="App">
      <header className="App-header">
        <div ref={mapContainer} style={{ width: "100%", height: "600px" }}> </div>
        <div id="instructions"></div>
      </header>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css"></link>

    </div>
  );  
}


export default AllRoutes;