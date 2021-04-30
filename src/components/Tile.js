import React from "react";
import { Box, Container, VStack, StackDivider } from "@chakra-ui/react";

const Tile = (props) => {
  const { day, setDailyTiles } = props;
  const id = day.weather[0].icon;

  const string = day.dt_txt;
  const date = string.substring(0, 10);
  let time = string.substring(11, 16) + " AM";
  const hour = string.substring(11, 13);

  if (parseInt(hour) > 12) {
    const newHour = parseInt(hour) - 12;
    time = String(newHour) + string.substring(13, 16) + " PM";
  } else if (parseInt(hour) == 12) {
    time = String(12) + string.substring(13, 16) + " NOON";
  }

  return (
    <>
      <Container
        onClick={() => setDailyTiles(date)}
        w={300}
        h={400}
        centerContent
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        bg="teal.600"
        color="teal.50"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box>
            {/* Weather Icon */}
            <img
              src={`http://openweathermap.org/img/wn/${id}@2x.png`}
              alt="weather icon"
            />
          </Box>
          <Box>
            {/* <h1>{day.weather[0].main}</h1> */}
            <h1>{day.weather[0].description}</h1>
            <h2>{`${day.main.temp}\xB0C`}</h2>
          </Box>
          <Box>
            <h4>{date}</h4>
          </Box>
          <Box>
            <h4>{time}</h4>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Tile;
