import React from 'react'
import { useState  , useEffect} from 'react';

const DisplayCountry = ({country}) => {
    // console.log(country);
    const imgSrc = country.flags.png
    const imgAlt = country.flags.alt
    // console.log(Object.values(country.languages));
    const APIkey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const [weather, setWeather] = useState(null)


    const getWeather = async (capitalCity) => {
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${APIkey}&units=metric`;

        const response = await fetch(urlWeather);
        const weatherData = await response.json();
        setWeather(weatherData);
    }

    useEffect(() => {
        getWeather(country.capital)
    } , [country.capital])

    // console.log(weather.main.temp);
    // console.log(country);

    return (
        <div>
            <h2>{country.name.common}</h2>
            <br />
            <p>Capital : {country.capital}</p>
            <p>Area : {country.area}</p>
            <div>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((language) => {
                        return <li key={language}>{language}</li>;
                    })}
                </ul>
                <img src={imgSrc} alt={imgAlt} />
            </div>
            {weather && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Wind: {weather.wind.speed} m/s</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                    />
                    <p>{weather.weather[0].description}</p>
                </div>
            )}

        </div>
    )
}

export default DisplayCountry