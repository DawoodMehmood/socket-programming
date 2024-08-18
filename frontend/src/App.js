import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const message = event.data.split(" ")[2]; // Extract the random value
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        value: parseFloat(message),
      };

      setData((prevData) => [...prevData, newDataPoint].slice(-20)); // Keep only the last 20 data points
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Data Visualization</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
