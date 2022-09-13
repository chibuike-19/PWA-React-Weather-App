import {useState} from 'react';
import { fetchWeather } from './api/FetchWhether';
import './app.css'

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = async(e) => {
    if(e.key === 'Enter'){
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
      console.log(weather.weather[0].icon)
    }
  }

  return (
    <div className="main-container">
      <input type='text' className='search' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyUp={search}/>
      {weather.main && (
        <div className='city'>
          <div className='city-name'>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </div>
          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <sup>&deg;c</sup>
          </div>
          <div className='info'>
            <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
