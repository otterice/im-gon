import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import loc from "./app/location.json"

function MarkRoutes() {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

  mapboxgl.accessToken = 'pk.eyJ1IjoiajVkYW5nIiwiYSI6ImNsaDJqbGdrazFlNngzbXBqaDFtZDN0M2UifQ.n11OY-5zVbp7n4JnvvS5Nw';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.8674);
  const [lat, setLat] = useState(34.8818);
  const [zoom, setZoom] = useState(9);
  const [routes, setRoutes] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [markers, setMarkers] = useState([]);
  var [savedDest, setSavedDest] = useState([]);

  var directions = useRef(null);





  useEffect(() => {
    if (map.current) return; // initialize map only once
    // parameters to ensure the model is georeferenced correctly on the map


    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });//.addControl(directions, 'top-left');
    
    var customPoints = [];

    loc.forEach((l, index) => {  
      if (index == 5) {
        return;
      }
      customPoints.push({ name: l.name, address: l.address, city: l.city, coordinates: [l.coordinates[1], l.coordinates[0]] });
    });



    // const customPoints = [
    //   { name: 'Point A', coordinates: [-117.8674, 34.8818] },
    //   { name: 'Point B', coordinates: [-118.8674, 35.8818] },
    //   { name: 'Point C', coordinates: [-118.8694, 36.8818] },
    //   { name: 'Point D', coordinates: [-117.8694, 35.8818] },
    //   { name: 'Point E', coordinates: [-116.8694, 33.8818] },
    //   { name: 'Point F', coordinates: [-113.8694, 32.8818] },
    // ];

    var apiReq = `https://api.mapbox.com/directions/v5/mapbox/driving/`;

    customPoints.forEach((point, index) => {
      apiReq += point.coordinates[0] + '%2C' + point.coordinates[1] + '%3B';
      // console.log(index);
    });
    apiReq = apiReq.slice(0, -3);
    apiReq += `?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;

    console.log(apiReq)
    const getData = async () => {
      await axios.get(
        apiReq)
        .then(response => {
          routes.push((response.data.routes));
          waypoints.push((response.data.waypoints));
          console.log(waypoints);

          directions = new MapboxDirections({
            interactive: false,
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            controls: { instructions: false }

          });

          map.current.on('move', () => {
            setLng(customPoints[0].coordinates[1].toFixed(4));
            setLat(customPoints[0].coordinates[0].toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
          });

   


          for (var i = 0; i < customPoints.length; i++) {
    


            markers.push(customPoints[i].coordinates);


            var popup = new mapboxgl.Popup({ offset: 25 })
              .setText(customPoints[i].name);


            var el = document.createElement('div');
            el.innerHTML = customPoints[i].name;
            el.id = 'marker';



            new mapboxgl.Marker(el)
              .setLngLat(customPoints[i].coordinates)
              .setPopup(popup) // sets a popup on this marker
              .addTo(map.current);

            console.log(customPoints[i].name);

            function createClickListener(index) {

              el.addEventListener('click', () => {
                console.log("in el");
                const result = window.confirm(`Do you want to select this one?`);

                if (result) {
                  console.log(markers[index]);
                  savedDest.push(markers[index]);

                } else {
                  // User clicked Cancel
                  // Do nothing or show a message
                }
              });


            };

            createClickListener(i);
          }

          console.log(markers);



          map.current.on('load', function () {
            //directions.setOrigin(waypoints[0][0].location);
            for (let i = 0; i < waypoints[0].length; i++) {
              const marker = new mapboxgl.Marker()
                .setLngLat(waypoints[0][i].location)
                .addTo(map.current);
            }
            //directions.setDestination(waypoints[0][waypoints[0].length - 1].location);
          });
          map.current.addControl(directions, 'top-left');
        });
    }

    getData();
  });

  const navigate = useNavigate();
  const passPoints = (id) => {
    navigate({
      pathname: "/allRoutes",
      search: createSearchParams({
        id: savedDest
      }).toString()
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3><button onClick={passPoints}>Next Page</button></h3>
        <div ref={mapContainer} style={{ width: "100%", height: "600px" }}> </div>


      </header>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css"></link>

    </div>
  );
}


export default MarkRoutes;