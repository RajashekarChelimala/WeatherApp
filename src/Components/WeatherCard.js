import React from 'react';
import './WeatherCard.css';

export const WeatherCard = ({
    name,
    lon,
    lat,
    temp,
    pressure,
    humidity,
    windSpeed,
    weatherDescription,
    icon,
    sunrise,
    sunset
}) => {
    console.log("::::::::>Hello")
    return (
        <div className="card text-white bg-dark mb-3">
            <div className="card-header">
                <h2>Weather Report of {name}</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title">Weather: {weatherDescription}</h5>
                {
                    icon&&(<img
                    src={`https://openweathermap.org/img/wn/${icon}.png`}
                    alt="Weather Icon"
                />)
                } 
                <p className="card-text">Temperature: {temp.toFixed()}°C</p>
                <p className="card-text">Humidity: {humidity}%</p>
                <p className="card-text">Wind Speed: {windSpeed} m/s</p>
                <p className="card-text">Sunrise: {sunrise}</p>
                <p className="card-text">Sunset: {sunset}</p>
            </div>
        </div>
    );
};
