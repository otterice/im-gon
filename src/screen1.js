import React, { useState } from 'react';

function Screen1() {
  const [startLat, setStartLat] = useState('');
  const [startLong, setStartLong] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLong, setEndLong] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the input values, e.g. update the state
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
