import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";
import Screen1 from "./screen1"
import AllRoutes from "./AllRoutes"
import MarkRoutes from "./MarkRoutes"

import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Screen1" element={<Screen1 />} />
        <Route path="/allRoutes" element={<AllRoutes />} />
        <Route path="/markRoutes" element={<MarkRoutes/>}/>
      </Routes>
    </Router>
  );
}

export default App;