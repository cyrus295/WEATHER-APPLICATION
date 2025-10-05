import React from "react";
import { WiHumidity, WiStrongWind, WiThermometer, WiBarometer } from "react-icons/wi";

export default function WeatherCard({ data, loading }) {
  if (loading) {
    return (
      <div className="weather-card loading">
        <div className="loading-spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (!data) return null;

  const { name, main, weather, wind, sys } = data;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">{name}, {sys.country}</h2>
        <p className="current-time">
          {new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <p className="temperature">{Math.round(main.temp)}°C</p>
          <p className="feels-like">
            Feels like {Math.round(main.feels_like)}°C
          </p>
        </div>
        
        <div className="weather-condition">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            className="weather-icon"
          />
          <p className="weather-description">
            {weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <WiHumidity className="detail-icon" />
          <div className="detail-content">
            <span className="detail-value">{main.humidity}%</span>
            <span className="detail-label">Humidity</span>
          </div>
        </div>

        <div className="detail-item">
          <WiStrongWind className="detail-icon" />
          <div className="detail-content">
            <span className="detail-value">{wind.speed} m/s</span>
            <span className="detail-label">Wind Speed</span>
          </div>
        </div>

        <div className="detail-item">
          <WiBarometer className="detail-icon" />
          <div className="detail-content">
            <span className="detail-value">{main.pressure} hPa</span>
            <span className="detail-label">Pressure</span>
          </div>
        </div>

        <div className="detail-item">
          <WiThermometer className="detail-icon" />
          <div className="detail-content">
            <span className="detail-value">
              {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°
            </span>
            <span className="detail-label">Min / Max</span>
          </div>
        </div>
      </div>
    </div>
  );
}