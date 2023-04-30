import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3><Link to="/allRoutes" >Go to all routes</Link></h3>
      <h3><Link to="/markRoutes" >Go to mark routes</Link></h3>

    </div>
  );
}
export default Home;