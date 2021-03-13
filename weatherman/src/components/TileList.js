import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile";

const TileList = () => {
  const [city, setCity] = useState({});
  const [list, setList] = useState([]);

  const URL =
    "http://api.openweathermap.org/data/2.5/forecast?q=galle&appid=01449de77e3668d9b85822879d4b13f1";

  useEffect(() => {
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { list, city } = data;
        setCity(city);
        setList(list);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>{city.name}</h1>
      {list.map((day) => {
        return <Tile day={day} />;
      })}
    </React.Fragment>
  );
};

export default TileList;
