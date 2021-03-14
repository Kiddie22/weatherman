import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile";
import { SimpleGrid } from "@chakra-ui/react";
import { cities } from "../cities";

const TileList = () => {
  const [query, setQuery] = useState("western province");
  const [city, setCity] = useState([]);
  const [list, setList] = useState([]);

  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=01449de77e3668d9b85822879d4b13f1&units=metric&cnt=20`;

  const current = new Date();
  const hourAsString = current.getHours();

  const result = list.filter((item) => {
    const string = item.dt_txt;
    const time = string.substring(11, 13);
    if (
      hourAsString - parseInt(time) > -6 &&
      hourAsString - parseInt(time) < 6
    ) {
      return item;
    }
  });

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
  }, [query]);

  const confirmSelection = () => {
    setQuery(document.getElementById("city").value);
  };

  return (
    <React.Fragment>
      <select name="city" id="city">
        {cities.map((city) => {
          return (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <button onClick={() => confirmSelection()}>Confirm</button>
      <h1>{city.name}</h1>
      <SimpleGrid minChildWidth="400px" spacing={10}>
        {result.map((day) => {
          return <Tile key={day.dt} day={day} />;
        })}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default TileList;
