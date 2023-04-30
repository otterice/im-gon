import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

function MarkRoutes() {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');


  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.8674);
  const [lat, setLat] = useState(34.8818);
  const [zoom, setZoom] = useState(9);
  const [routes, setRoutes] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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
      { name: 'Point D', coordinates: [-117.8694,35.8818] },
      { name: 'Point E', coordinates: [-116.8694,33.8818] },
      { name: 'Point F', coordinates: [-113.8694,32.8818] },
      { name: 'Point G', coordinates: [-114.6594,35.8818] },
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

        directions = new MapboxDirections({
            interactive:false,
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

    

    // // create DOM element for the marker
    // var el = document.createElement('div');
    // el.innerHTML = "Marker1";
    // el.id = 'marker';

    // // create the marker
    // const marker1 = new mapboxgl.Marker(el)
    //     .setLngLat([-115.7000,35.8000])
    //     .setPopup(popup) // sets a popup on this marker
    //     .addTo(map.current);

    // el.addEventListener('click', () => 
    //     { 
    //         const result = window.confirm('Are you sure you want to delete this item?');
    //         if (result) {
    //             console.log(marker1.getLngLat());
    //         } else {
    //         // User clicked Cancel
    //         // Do nothing or show a message
    //         }

    //     }
    // );


    for (var i = 0; i < customPoints.length; i++) {
        markers.push(customPoints[i].coordinates);


        var popup = new mapboxgl.Popup({offset: 25})
    .setHTML(`<div>The museum</div><button id="btn${i}">Yes</button>`);
       

          var el = document.createElement('div');
          el.innerHTML = "Marker" + i;
          el.id = 'marker';

          

        

        let marker = new mapboxgl.Marker(el)
        .setLngLat(customPoints[i].coordinates)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map.current);

        console.log(customPoints[i].coordinates);

          el.addEventListener("click", myFunction1);

          async function myFunction1() {
            const delay = ms => new Promise(res => setTimeout(res, ms));

            await delay(3000);

            console.log(markers[i]);

            const element = document.getElementById(`btn${i   }`);
            element.addEventListener("click", myfunct2);

            function myfunct2() {
                console.log("hey");
            }

          }

     function createClickListener(index) {
        el.addEventListener('click', () => {
            //const result = window.confirm('Are you sure you want to delete this item?');
    //         const newPopupWindow = window.open('', '', 'width=400,height=200');
    // newPopupWindow.document.body.innerHTML = `
    //   <div style="text-align: center;">
    //     <p>${markers[index]}</p>
    //     <button id="popup-yes" style="margin-right: 20px;">Yes</button>
    //     <button id="popup-no">No</button>
    //   </div>
    // `;
      
            if (true) {
                console.log(markers[index]);
            } else {
                // User clicked Cancel
                // Do nothing or show a message
            }
        });
        
    
    };

        createClickListener(i);
    }

      console.log(markers);

    

    map.current.on('load', function() {
      directions.setOrigin(waypoints[0][0].location);
      for (let i = 1; i < waypoints[0].length-1; i++) {
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
      </header>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css"></link>

    </div>
  );  
}


export default MarkRoutes;