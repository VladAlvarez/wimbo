import './App.css';
import Today from './Today'
import WeatherData from './WeatherData';
// import WimboBar from './WimboBar';
// import WindDirection from './WindDirection';

function App() {
  return (
    <div className="App">
        <Today />
        {/* <WimboBar /> */}
        {/* <WindDirection /> */}
        <WeatherData />
    </div>
  );
}

export default App;
