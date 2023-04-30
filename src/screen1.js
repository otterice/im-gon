import React, { useState } from 'react';
import axios from 'axios';

function Screen1() {
  const [startLat, setStartLat] = useState('');
  const [startLong, setStartLong] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLong, setEndLong] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an API request to Flask to get the Yelp results
    try {
      const response = await axios.get(`http://localhost:105/ycyrc?startLat=${startLat}&startLong=${startLong}&endLat=${endLat}&endLong=${endLong}`);
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
        Starting Latitude:
      </label>
      <input type="text" value={startLat} onChange={(e) => setStartLat(e.target.value)} style={{ width: '150px', height: '30px', fontSize: '16px' }} />
    </div>
    <br />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <label style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
        Starting Longitude:
      </label>
      <input type="text" value={startLong} onChange={(e) => setStartLong(e.target.value)} style={{ width: '150px', height: '30px', fontSize: '16px' }} />
    </div>
    <br />
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
    <br />
    <button type="submit" style={{ width: '100px', height: '30px', fontSize: '20px' }}>Submit</button>
  </form> 
</div>


  );
}

export default Screen1;
