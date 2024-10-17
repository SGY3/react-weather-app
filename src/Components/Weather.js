import React, { useState } from 'react'
import './Weather.css';
import { FaSearch, FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';
const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState();
    const [error, setError] = useState('');
    const API_KEY = '60400e3564d20bea04af7991e987bc30';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    function handleOnChange(event) {
        setCity(event.target.value);
    }
    async function fetchData() {
        try {
            if (city !== '') {
                let response = await fetch(url);
                if (response.ok) {
                    let output = await response.json();
                    setWeather(output);
                    setError('');
                }
                else {
                    setError('No data found, Enter proper city name');
                }
            }
            else {
                setError('Enter proper city name');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container'>
            <div className='city'>
                <input type='text' value={city} onChange={handleOnChange} placeholder='Enter city name'></input>
                <button onClick={() => fetchData()}>
                    <FaSearch></FaSearch>
                </button>
            </div>
            {
                error && <p className='error-message'>{error}</p>
            }
            {
                weather && weather.weather &&
                <div className='content'>
                    <div className='weather-image'>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
                        <h3 className='desc'>{weather.weather[0].description}</h3>

                    </div>
                    <div className='weather-temp'>
                        <h3>{weather.main.temp}<span>&deg;C</span></h3>
                    </div>
                    <div className='weather-city'>
                        <div className='location'>
                            <MdLocationOn></MdLocationOn>
                        </div>
                        <p>{weather.name},<span>{weather.sys.country}</span></p>
                    </div>
                    <div className='weather-status'>
                        <div className='wind'>
                            <div className='wind-icon'>
                                <FaWind></FaWind>
                            </div>
                            <h3 className='wind-speed'>{weather.wind.speed} km/h</h3>
                            <h3 className='wind-heading'>Wind Speed</h3>
                        </div>
                        <div className='humidity'>
                            <div className='humidity-icon'>
                                <WiHumidity></WiHumidity>
                            </div>
                            <div className='humidity-percent'>{weather.main.humidity}%</div>
                            <h3 className='humidity-heading'>Humidity Speed</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Weather
