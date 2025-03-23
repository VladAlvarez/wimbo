import { useState, useEffect } from "react";
import axios from "axios";
import { formatWeatherData } from "../utils/utils";

const API_ENDPOINT = "https://i5sfgve9pf.execute-api.us-west-2.amazonaws.com/queryWeatherData";

const useWeatherData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      console.log("Response Data:", response.data);
  
      // If the data is an object and not an array, directly set it
      if (!Array.isArray(response.data)) {
        setData([response.data]); // Wrap in an array if needed
      } else {
        // If it was an array, sort it
        const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setData(sortedData);
      }
  
      setLoading(false);
    } catch (err) {
      setError("Error fetching data: " + err.message);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3600000); // Fetch every hour

    return () => clearInterval(intervalId);
  }, []);

  return { data, loading, error };
};

export default useWeatherData;
