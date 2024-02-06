import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { WeatherCard } from './Components/WeatherCard';
import bgImage from './Images/bg.jpg';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [errorC, setErrorC] = useState('');
  const [currentLocationData, setCurrentLocationData] = useState();
  const [cityData, setCityData] = useState();
  const [fetchCurrentLocation, setFetchCurrentLocation] = useState(false);

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    console.log(city)
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3820288f86c81178bc7d6c0704a6eed2`
    )
      .then((response) => response.json())
      .then((data) => {
        setCityData(data);
        console.log(data)
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    if (fetchCurrentLocation && 'geolocation' in navigator) {
      console.log("::in use effect")
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3820288f86c81178bc7d6c0704a6eed2`)
            .then((response) => response.json())
            .then((data) => setCurrentLocationData(data))
            
            .catch((error) => {
              setErrorC(error);
            });
        },
        (error) => {
          setErrorC(error);
        }
      );
    }
  }, [fetchCurrentLocation]);

  const currentHandler = () => {
    setFetchCurrentLocation(true);
  };

  

  const { coord: currentCoord, weather: currentWeather, main: currentMain, wind: currentWind, sys: currentSys, name: currentName } = currentLocationData || {};
  const { coord: cityCoord, weather: cityWeather, main: cityMain, wind: cityWind, sys: citySys, name: cityName } = cityData || {};

  return (
    <>
      <div className="container">
        <div className='row'>
          <div className='col-12'>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="w-50">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="CityEntry" className="h2">
                      Enter the City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="CityEntry"
                      aria-describedby="EnterCity"
                      placeholder="Enter City"
                      value={city}
                      onChange={changeHandler}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary my-3">
                    Submit
                  </button><br></br>
                </form>
                <button onClick={currentHandler} className="btn btn-warning my-3">
                    Get Current City Weather
                  </button>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          {currentLocationData && currentCoord &&(
            <div className="col-md-6 mt-4">
              <WeatherCard
                name={currentName}
                lon={currentCoord.lon}
                lat={currentCoord.lat}
                temp={currentMain.temp - 273.15}
                pressure={currentMain.pressure}
                humidity={currentMain.humidity}
                windSpeed={currentWind.speed}
                weatherDescription={currentWeather[0].description}
                icon={currentWeather[0].icon}
                sunrise={new Date(currentSys.sunrise * 1000).toLocaleString('en-IN')}
                sunset={new Date(currentSys.sunset * 1000).toLocaleString('en-IN')}
              />
            </div>
          )}
          {cityData && cityCoord &&(
            <div className="col-md-6 mt-4">
              <WeatherCard
                name={cityName}
                lon={cityCoord.lon}
                lat={cityCoord.lat}
                temp={cityMain.temp - 273.15}
                pressure={cityMain.pressure}
                humidity={cityMain.humidity}
                windSpeed={cityWind.speed}
                weatherDescription={cityWeather[0].description}
                icon={cityWeather[0].icon}
                sunrise={new Date(citySys.sunrise * 1000).toLocaleString('en-IN')}
                sunset={new Date(citySys.sunset * 1000).toLocaleString('en-IN')}
              />
            </div>
          )}
        </div>
      </div>
    </>

  );
}

export default App;