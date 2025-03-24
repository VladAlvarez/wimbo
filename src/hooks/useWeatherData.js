import { useState, useEffect } from "react";
import axios from "axios";
// import { formatWeatherData } from "../utils/utils"; 

const API_ENDPOINT = "https://i5sfgve9pf.execute-api.us-west-2.amazonaws.com/queryWeatherData";

const useWeatherData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      console.log("Response Data:", response.data);
  
      let newData = response.data;
  
      if (!Array.isArray(newData)) {
        newData = [newData]; // Wrap it in an array if it's a single object
      }
  
      // Ensure all data points have timestamps before sorting
      const validData = newData.filter(d => d.timestamp);
      
      // Sort in descending order based on timestamp
      const sortedData = validData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
      setData(sortedData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data: " + err.message);
      setLoading(false);
    }
  };  

  useEffect(() => {
    console.log("Updated Weather Data for Charts:", data);
  }, [data]);
  

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3600000); // Fetch every hour
    // const intervalId = setInterval(fetchData, 60000); // Every minute for testing


    return () => clearInterval(intervalId);
  }, []);

  return { data, loading, error };
};

export default useWeatherData;
