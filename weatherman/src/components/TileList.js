import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile";
import { cities } from "../cities";
import { SimpleGrid } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Heading, StackDivider } from "@chakra-ui/react";

const TileList = () => {
  const [query, setQuery] = useState("western province");
  const [city, setCity] = useState([]);
  const [list, setList] = useState([]);

  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=01449de77e3668d9b85822879d4b13f1&units=metric&cnt=40`;

  const current = new Date();
  const hourAsString = current.getHours();

  const result = list.filter((item) => {
    const string = item.dt_txt;
    const time = string.substring(11, 13);
    if (
      hourAsString - parseInt(time) > -2 &&
      hourAsString - parseInt(time) < 2
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
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={10}
        align="stretch"
      >
        <Box>
          <HStack spacing="24px">
            <Box>
              <h2> Select city: &nbsp; </h2>
            </Box>
            <Box>
              <Select variant="filled" name="city" id="city">
                {cities.map((city) => {
                  return (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box w="40px" h="40px" bg="pink.100">
              <Button
                colorScheme="teal"
                // variant="outline"
                onClick={() => confirmSelection()}
              >
                Confirm
              </Button>
            </Box>
          </HStack>
        </Box>
        <Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Heading>{city.name}</Heading>
          </div>
        </Box>
        <Box>
          <SimpleGrid columns={5} spacing={20}>
            {result.map((day) => {
              return <Tile key={day.dt} day={day} />;
            })}
          </SimpleGrid>
        </Box>
      </VStack>
    </React.Fragment>
  );
};

export default TileList;
