export const formatWeatherData = (rawData) => {
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
  