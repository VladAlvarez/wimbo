import React, { useEffect, useState } from "react";
import axios from "axios";
import TemperatureChart from "./components/TemperatureChart";
import WindSpeedGraph from "./components/WindSpeedGraph";
import RainAmountChart from "./components/RainAmountChart";

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

      <TemperatureChart data={data} />
      <WindSpeedGraph data={data} />
      <RainAmountChart data={data} />
    </div>
  );
};

export default WeatherDataCharts;
