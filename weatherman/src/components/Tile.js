import React from "react";
import { Container } from "@chakra-ui/react";

const Tile = (props) => {
  const { day } = props;
  const id = day.weather[0].icon;

  return (
    <>
      <Container
        centerContent
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        ml="2"
        border="2px solid"
        borderColor="green.500"
      >
        <img
          src={`http://openweathermap.org/img/wn/${id}@2x.png`}
          alt="weather icon"
        />
        <h1>{day.weather[0].main}</h1>
        <h2>{day.weather[0].description}</h2>
        <h2>{`${day.main.temp}\xB0C`}</h2>
        <h6>{day.dt_txt}</h6>
      </Container>
    </>
  );
};

export default Tile;
