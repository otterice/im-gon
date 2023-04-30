import React, { useState } from "react";

function MyComponent() {
  const [startLat, setStartLat] = useState("");
  const [startLong, setStartLong] = useState("");
  const [endLat, setEndLat] = useState("");
  const [endLong, setEndLong] = useState("");

  return (
    <div>
      <form>
        <label>
          Starting Latitude:
          <input type="text" value={startLat} onChange={(e) => setStartLat(e.target.value)} />
        </label>
        <label>
          Starting Longitude:
          <input type="text" value={startLong} onChange={(e) => setStartLong(e.target.value)} />
        </label>
        <label>
          Ending Latitude:
          <input type="text" value={endLat} onChange={(e) => setEndLat(e.target.value)} />
        </label>
        <label>
          Ending Longitude:
          <input type="text" value={endLong} onChange={(e) => setEndLong(e.target.value)} />
        </label>
      </form>
    </div>
  );
}

export default MyComponent;
