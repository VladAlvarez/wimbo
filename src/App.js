import './index.css';
import Navbar from './components/Navbar';
import Today from './Today'
import WeatherData from './WeatherData';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Today />
        <WeatherData />
    </div>
  );
}

export default App;
