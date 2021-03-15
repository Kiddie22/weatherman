import React from "react";
import { Container } from "@chakra-ui/react";
import { Box, VStack, StackDivider } from "@chakra-ui/react";

const Tile = (props) => {
  const { day } = props;
  const id = day.weather[0].icon;

  const string = day.dt_txt;
  const date = string.substring(0, 10);
  let time = string.substring(11, 16) + " AM";
  const hour = string.substring(11, 13);

  if (parseInt(hour) > 12) {
    const newHour = parseInt(hour) - 12;
    time = String(newHour) + string.substring(13, 16) + " PM";
  }

  if (time)
    return (
      <>
        <Container
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
            <Box centerContent>
              <img
                src={`http://openweathermap.org/img/wn/${id}@2x.png`}
                alt="weather icon"
              />
            </Box>
            <Box centerContent>
              {/* <h1>{day.weather[0].main}</h1> */}
              <h1>{day.weather[0].description}</h1>
              <h2>{`${day.main.temp}\xB0C`}</h2>
            </Box>
            <Box centerContent>
              <h4>{date}</h4>
            </Box>
            <Box centerContent>
              <h4>{time}</h4>
            </Box>  
          </VStack>
        </Container>
      </>
    );
};

export default Tile;
