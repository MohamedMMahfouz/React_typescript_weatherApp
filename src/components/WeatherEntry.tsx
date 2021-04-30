import React, { FC } from "react";
import { Weather } from "../model/Weather";
import { getIconUrl } from "../services/WeatherService";

interface Props {
  weather: Weather
}

function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherEntry: FC<Props> = ({ weather }) =>
  <div>
    <div>
      {convertUnixTimeToDate(weather.dt).toLocaleDateString()}
    </div>
    <strong>{weather.main.temp}</strong>
    <div>({weather.main.temp_min}°C / {weather.main.temp_max}°C)</div>
    <div>Humidity: {weather.main.humidity}%</div>
    {weather.weather.map(condition =>
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main} /> {condition.main} {condition.description}
      </div>)
    }
  </div>