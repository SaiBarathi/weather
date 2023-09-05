import React, { useEffect, useState } from "react";
import "./App.css";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
const autoCompleteURL =
  "https://api.weatherapi.com/v1/search.json?key=6508e8cf509049dcb4e44902231808&q=";

const weatherURL = (city) =>
  `https://api.weatherapi.com/v1/forecast.json?key=6508e8cf509049dcb4e44902231808&q=${city}&days=7&aqi=no&alerts=no `;

function App() {
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(false);
  const [current, setcurrent] = useState();
  const [forecast, setforecast] = useState();
  const [location, setLocation] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);

  const handleClick = async (clickedCity) => {
    setCity(clickedCity);
    setClicked(true);

    const resp = await fetch(weatherURL(city));
    const data = await resp.json();
    setcurrent(data.current);
    setforecast(data.forecast);
    setLocation(data.location.name);
  };
  useEffect(() => {
    const fetchCitySuggestion = async () => {
      const resp = await fetch(autoCompleteURL + city);
      const data = await resp.json();
      const citySuggestionData = data.map(
        (curData) => `${curData.name},${curData.region},${curData.country}`
      );
      setCitySuggestion(citySuggestionData);
    };
    if (!clicked && city.length > 2) {
      fetchCitySuggestion();
    } else {
      setCitySuggestion([]);
      setClicked(false);
    }
  }, [city]);
  return (
    <div className="App">
      <div className="header">
        <b>Weather report</b>
      </div>
      <div className="App-header">
        <input
          type="text"
          className="citytextbox"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {citySuggestion.length > 0 && (
          <div className="suggestionWrapper">
            {citySuggestion.map((curcity, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={() => handleClick(curcity)}
              >
                {curcity}
              </div>
            ))}
          </div>
        )}
        {current && <Current current={current} city={location} />}
        {forecast && <Forecast forecast={forecast} city={location} />}
      </div>
    </div>
  );
}

export default App;
