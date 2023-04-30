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
    <div>
      <h1>Enter Starting and Ending Coordinates</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Starting Latitude:
          <input type="text" value={startLat} onChange={(e) => setStartLat(e.target.value)} />
        </label>
        <br />
        <label>
          Starting Longitude:
          <input type="text" value={startLong} onChange={(e) => setStartLong(e.target.value)} />
        </label>
        <br />
        <label>
          Ending Latitude:
          <input type="text" value={endLat} onChange={(e) => setEndLat(e.target.value)} />
        </label>
        <br />
        <label>
          Ending Longitude:
          <input type="text" value={endLong} onChange={(e) => setEndLong(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form> 
    </div>
  );
}

export default Screen1;
