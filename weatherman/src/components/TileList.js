import React from "react";
import Tile from "./Tile";
import { data } from "../data";

const tileList = () => {
  const { list, city } = data;
  return (
    <React.Fragment>
      <h1>
        {city.name},{city.country}
      </h1>
    </React.Fragment>
  );
};
export default tileList;