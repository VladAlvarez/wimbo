import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const WeatherDataCharts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    const apiEndpoint = "https://i5sfgve9pf.execute-api.us-west-2.amazonaws.com/dev/queryWeatherData";

    axios
      .get(apiEndpoint)
      .then((response) => {
        setData(formatWeatherData(response.data));
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data: " + err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every hour
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(intervalId); // Clean up the interval when the component is unmounted
  }, []); // Empty dependency array means this runs once on mount

  const formatWeatherData = (rawData) => {
    const groupedData = {};

    rawData.forEach((item) => {
      const timestamp = new Date(item.timestamp);
      const day = timestamp.getDate();
      const month = timestamp.toLocaleString("en-US", { month: "long" });

      const suffix = (day) => (day >= 11 && day <= 13 ? "th" : ["st", "nd", "rd"][day % 10 - 1] || "th");
      const formattedDate = `${month} ${day}${suffix(day)}`;
      const formattedTime = `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, "0")}`;

      const formattedTimestamp = `${formattedDate}, ${formattedTime}`;

      if (!groupedData[formattedTimestamp]) {
        groupedData[formattedTimestamp] = { timestamp: formattedTimestamp };
      }

      if (item.sensor_id === "temperature") {
        groupedData[formattedTimestamp].temperature = item.temperature;
      } else if (item.sensor_id === "wind_speed") {
        groupedData[formattedTimestamp].wind_speed = item.wind_speed;
      } else if (item.sensor_id === "rain_gauge") {
        groupedData[formattedTimestamp].rain_amount = item.rain_amount;
      }
    });

    return Object.values(groupedData).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Weather Data</h2>

      {/* Temperature Chart */}
      <h3>Temperature (°C)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="url(#colorTemp)" />
        </AreaChart>
      </ResponsiveContainer>

      {/* Wind Speed Chart */}
      <h3>Wind Speed (km/h)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="wind_speed" stroke="#82ca9d" fill="url(#colorWind)" />
        </AreaChart>
      </ResponsiveContainer>

      {/* Rain Amount Chart */}
      <h3>Rain Amount (mm)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="rain_amount" stroke="#ffc658" fill="url(#colorRain)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherDataCharts;
