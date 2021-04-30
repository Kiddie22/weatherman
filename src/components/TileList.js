import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile";
import { cities } from "../cities";
import { Box, Button, Select } from "@chakra-ui/react";
import { HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { Heading, StackDivider } from "@chakra-ui/react";
import { Tabs, Tab } from "@chakra-ui/react";

const TileList = () => {
  const [query, setQuery] = useState("western province");
  const [city, setCity] = useState([]);
  const [list, setList] = useState([]);
  const [dailyResult, setDailyResult] = useState([]);

  // API request
  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=01449de77e3668d9b85822879d4b13f1&units=metric&cnt=40`;

  const current = new Date();
  const hourAsString = current.getHours();

  // filter results according to +/- 2 hours of current time
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

  // filter results to get tiles of the date clicked
  const setDailyTiles = (date) => {
    let tempArray = list.filter((item) => {
      const string = item.dt_txt;
      const day = string.substring(0, 10);
      const time = string.substring(11, 13);
      if (
        date === day &&
        hourAsString - parseInt(time) > -6 &&
        hourAsString - parseInt(time) < 6
      ) {
        return item;
      }
    });
    setDailyResult(tempArray);
  };

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

  // button function
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
        <Box id="citySelect">
          <HStack spacing="24px">
            <h2> Select City : &nbsp; </h2>
            <Box>
              {/* Dropdown menu for city selection */}
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
            {/* Confirm city selection button */}
            <Button colorScheme="teal" onClick={() => confirmSelection()}>
              Confirm
            </Button>
          </HStack>
        </Box>
        <Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Heading>{city.name}</Heading>
          </div>
        </Box>

        <Tabs isFitted variant="enclosed">
          {/* <TabList> */}
          <SimpleGrid columns={5}>
            {result.map((day) => {
              return (
                <Tab>
                  <Tile key={day.dt} day={day} setDailyTiles={setDailyTiles} />
                </Tab>
              );
            })}
          </SimpleGrid>
          {/* </TabList> */}

          {/* Detailed tiles for a day */}
          {/* <TabList> */}
          <SimpleGrid columns={4}>
            {dailyResult.map((day) => {
              return (
                <Tab>
                  <Tile key={day.dt} day={day} setDailyTiles={setDailyTiles} />
                </Tab>
              );
            })}
          </SimpleGrid>
          {/* </TabList> */}
        </Tabs>
      </VStack>
    </React.Fragment>
  );
};

export default TileList;
