import React from "react";

const Tile = (props) => {
  const { day } = props;
  return (
    <>
      <h1>{day.weather[0].main}</h1>
      <h2>{day.weather[0].description}</h2>
      <h6>{day.dt_txt}</h6>
    </>
  );
};

export default Tile;
