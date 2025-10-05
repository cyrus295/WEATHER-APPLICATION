import React, { useState } from "react";
import { fetchWeather } from "./api";
import WeatherCard from "./WeatherCard";
import "./STYLE/App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setCity(""); 
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">know Weather -- App</h1>
          <p className="app-subtitle">Get real-time weather info </p>
        </header>
        
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter CITY name ..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="search-input"
            />
            <button 
              onClick={handleSearch} 
              disabled={loading || !city.trim()}
              className="search-button"
            >
              {loading ? "Searching....................................." : "Search"}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span>----------------⚠️--------------</span>
            {error}
          </div>
        )}

        <WeatherCard data={weather} loading={loading} />
      </div>
    </div>
  );
}

export default App;