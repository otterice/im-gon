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


const App = () => {
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