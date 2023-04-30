import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Screen1() {
  const [startLat, setStartLat] = useState('');
  const [startLong, setStartLong] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLong, setEndLong] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an API request to Flask to get the Yelp results
    try {
      const start = startLat.split(',');
      const end = startLong.split(',');
      console.log(start);
      console.log(end);
      const response = await axios.get(`http://localhost:105/ycyrc?startLat=${start[0]}&startLong=${start[1]}&endLat=${end[0]}&endLong=${end[1]}`);
      console.log(response);

      const results = response.data;
      // Do something with the results, e.g. update the state
    } catch (error) {
      console.error(error);
    }
  }

  return (
<div style={{ background: 'linear-gradient(45deg, #25da5e 10%, #5939c6 200%)', minHeight: '100vh', margin: 0, padding: 0, overflow: 'hidden'}}>
  <h1 style={{ textAlign: 'center' }}>Enter Starting and Ending Coordinates</h1>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <label style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
        Starting (Lat,Long):
      </label>
      <input type="text" value={startLat} onChange={(e) => setStartLat(e.target.value)} style={{ width: '150px', height: '30px', fontSize: '16px' }} />
    </div>
    <br />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <label style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
        End (Lat,Long):
      </label>
      <input type="text" value={startLong} onChange={(e) => setStartLong(e.target.value)} style={{ width: '150px', height: '30px', fontSize: '16px' }} />
    </div>
    <br />
    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <label style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
        Ending Latitude:
      </label>
      <input type="text" value={endLat} onChange={(e) => setEndLat(e.target.value)} style={{ width: '150px', height: '30px', fontSize: '16px' }} />
    </div>
    <br />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <label style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
        Ending Longitude:
      </label>
      <input type="text" value={endLong} onChange={(e) => setEndLong(e.target.value)} style={{ width: '150px', height: '30px', fontSize: '16px', textIndent: '5px'}} />
    </div>
    <br />*/
    <button type="submit" style={{ width: '100px', height: '30px', fontSize: '20px' }}>Submit</button> }
    <h3><Link to="/markRoutes" >Go to all screen1</Link></h3>

  </form> 
</div>


  );
}

export default Screen1;
