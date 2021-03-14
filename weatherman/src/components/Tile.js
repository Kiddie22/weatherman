import React from "react";
import { Container } from "@chakra-ui/react";

const Tile = (props) => {
  const { day } = props;
  const id = day.weather[0].icon;

  const string = day.dt_txt;
  const date = string.substring(0, 10);
  let time = string.substring(11, 16) + " AM";
  const hour = string.substring(11, 13);

  if (parseInt(hour) > 12) {
    const newHour = parseInt(hour) - 12;
    time = String(newHour) + string.substring(13,16) + " PM"; 
  }

  if (time)
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
          textTransform="uppercase"
        >
          <img
            src={`http://openweathermap.org/img/wn/${id}@2x.png`}
            alt="weather icon"
          />
          <h1>{day.weather[0].main}</h1>
          {/* <h2>{day.weather[0].description}</h2> */}
          <h2>{`${day.main.temp}\xB0C`}</h2>
          <h4>{date}</h4>
          <h4>{time}</h4>
        </Container>
      </>
    );
};

export default Tile;
