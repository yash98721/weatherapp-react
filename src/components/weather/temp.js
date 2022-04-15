import React, { useState,useEffect } from "react";
import "./style.css";
import Weathercard from "./weathercard";

// https://api.openweathermap.org/data/2.5/weather?q=ghaziabad&appid=5c71d1f73c006454eb432ba9a93f438f
const Temp = () => {
  const [searchValue, setSearchValue] = useState("Ghaziabad");
  const [tempInfo, setTempInfo] = useState("")



  const getWeatherInfo = async () => {
    try {
      let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5c71d1f73c006454eb432ba9a93f438f`;
         
        let res = await fetch(url)
        let data = await res.json()

// deconstructing the objects 

      const {temp,humidity,pressure} = data.main
      const {main: weathermood} =data.weather[0]
      const {name} = data
      const {speed} = data.wind
      const {country,sunset} = data.sys
      
      const myNewWeatherInfo = {
        temp,humidity,pressure,
        weathermood,
        name,
        speed,
        country,sunset,
      } 
      setTempInfo(myNewWeatherInfo)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search"
            autoFocus
            id="search"
            clasasName="searchTerm"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
    <Weathercard {...tempInfo}/>
    </>
  );
};

export default Temp;
