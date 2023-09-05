import React from "react";
import "./Current.css";
function Current({ current, city }) {
  return (
    <div className="current">
      <br />
      <b>
        <i>Current Weather</i>
      </b>
      <div className="currentBody">
        <img src={current.condition.icon} />
        <span>{current.condition.text}</span>
        <span>
          <b>&emsp;Temp:</b>
          {current.temp_c}°C
        </span>
        <span>
          <b>&emsp;Feels like:</b>
          {current.feelslike_c}°C
        </span>
        <span>
          <b>&emsp;Wind:</b>
          {current.wind_kph} kph
        </span>
      </div>
    </div>
  );
}
export default Current;
