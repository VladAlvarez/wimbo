import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint
    const apiEndpoint = 'https://i5sfgve9pf.execute-api.us-west-2.amazonaws.com/dev/queryWeatherData';

    // Fetch data from the API
    axios.get(apiEndpoint)
      .then(response => {
        setData(response.data);  // Store the response data in state
        setLoading(false);        // Update loading state
      })
      .catch(err => {
        setError('Error fetching data: ' + err.message);  // Set error message
        setLoading(false);        // Update loading state
      });
  }, []);  // Empty dependency array, so this runs once when the component mounts

  // Render loading, error, or the data
  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Weather Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>Temperature: {item.temperature}°C</p>
            <p>Sensor ID: {item.sensor_id}</p>
            <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherData;