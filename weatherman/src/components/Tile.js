import React from "react";

const Tile = (props) => {
  const { day } = props;
  return (
    <>
      <h2>{day.main.temp}</h2>
    </>
  );
};

export default Tile;
