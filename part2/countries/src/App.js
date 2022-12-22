import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [weather, setWeather] = useState(null);
  const [value, setValue] = useState('');
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);
    const filtered = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setSearchResults(filtered);
    filtered.length === 1 && getWeather(filtered[0].capitalInfo.latlng);
  };

  const handleClick = (name) => {
    setValue(name);
    handleSearch({ target: { value: name } });
  };

  const getWeather = (cordinates) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cordinates[0]}&lon=${cordinates[1]}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  };

  return (
    <div className="App">
      <div>
        find country:
        <input onChange={handleSearch} type="search" value={value} />
      </div>
      <div>
        {searchResults.length === 1 ? (
          searchResults.map((result, id) => (
            <div key={id}>
              <h2>{result.name.common}</h2>
              <p>capital {result.capital}</p>
              <p>area {result.area}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(result.languages).map((language, id) => (
                  <li key={id}>{language}</li>
                ))}
              </ul>
              <img
                src={result.flags.png}
                alt={`flag of ${result.name.common}`}
              />
              <h2>Weather in {result.capital}</h2>
              <p>temperatures: {weather?.main.temp} </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>wind: {weather?.wind.speed} m/s</p>
            </div>
          ))
        ) : searchResults.length <= 10 ? (
          searchResults.map((result, id) => (
            <div>
              <p key={id}>
                {result.name.common}
                <button onClick={() => handleClick(result.name.common)}>
                  show
                </button>
              </p>
            </div>
          ))
        ) : (
          <p>too many matches, specifiy another filter</p>
        )}
      </div>
    </div>
  );
}

export default App;
