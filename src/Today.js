// import React, { useState, useEffect } from 'react';
// import mqtt from 'mqtt';

// const WeatherDisplay = () => {
//   const [weatherData, setWeatherData] = useState({ temperature: 0, windspeed: 0 });

//   useEffect(() => {
//     const client = mqtt.connect('a37t54mfl8hvzi-ats.iot.us-west-2.amazonaws.com', {
//       username: '<your-username>',
//       password: '<your-password>',
//       clientId: 'react-client',
//       protocol: 'mqtts',
//       port: 8883,
//     });

//     client.on('connect', () => {
//       console.log('Connected to AWS IoT');
//       client.subscribe('weather/data', (err) => {
//         if (err) {
//           console.log('Subscription error: ', err);
//         }
//       });
//     });

//     client.on('message', (topic, message) => {
//       if (topic === 'weather/data') {
//         const data = JSON.parse(message.toString());
//         setWeatherData(data); // Update state with new data
//       }
//     });

//     return () => {
//       client.end(); // Clean up MQTT connection when component unmounts
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Current Weather</h2>
//       <p>Temperature: {weatherData.temperature} °C</p>
//       <p>Wind Speed: {weatherData.windspeed} km/h</p>
//     </div>
//   );
// };

// export default WeatherDisplay;




const Today = () => {
    const currentTemp = 13  // switch to data collected from Wimbo stored at AWS
    const currentWindSpeed = 15 // switch to data collected from Wimbo stored at AWS
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const currentDay = days[today.getDay()]; 

    return (
        <div>
            <div>
                <h1>{ currentTemp}C</h1>
                <h1>{ currentWindSpeed }KTS test</h1>
            </div>
            <div>
                <p>{ currentDay }</p>
            </div>
        </div>
    );
}
 
export default Today;