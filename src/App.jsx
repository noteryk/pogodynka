import React, { useState } from "react";
import 'tailwindcss/tailwind.css';

const weatherApi = {
 key: "39cadc7a931606acedb86ea47e72c040",
 base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
 const [cityName, setCityName] = useState("");
 const [weatherData, setWeatherData] = useState({});

 const fetchWeather = () => {
  fetch(`${weatherApi.base}weather?q=${cityName}&units=metric&APPID=${weatherApi.key}&lang=pl`)
     .then((response) => response.json())
     .then((result) => {
       setWeatherData(result);
     });
 };
 

 const getWeatherIcon = (weatherCode) => {
    return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
 };

 return (
    <div className="App">
      <header className="Header bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Pogodynka</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Wpisz nazwę miasta"
            onChange={(e) => setCityName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <button
            onClick={fetchWeather}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Wyszukaj
          </button>
        </div>

        {typeof weatherData.main !== "undefined" ? (
          <div className="mt-4">
            <p className="text-lg"> Miejscowość: {weatherData.name}</p>
            <p className="text-lg"> Temperatura: {weatherData.main.temp}°C</p>
            <p className="text-lg"> Pogoda: {weatherData.weather[0].main}</p>
            <p className="text-lg"> Opis pogody:  ({weatherData.weather[0].description})</p>
            <p className="text-lg"> Wilgotność: ({weatherData.main.humidity}) %</p>
            <p className="text-lg"> Ciśnienie: ({weatherData.main.pressure}) hPa</p>
            <p className="text-lg"> Wiatr: ({weatherData.wind.speed}) m/s</p>
            <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="Ikona pogody" className="w-16 h-16" />
          </div>
        ) : (
          <p className="mt-4 text-red-500">Błąd wyszukiwania!</p>
        )}
      </header>
    </div>
 );
}

export default App;
