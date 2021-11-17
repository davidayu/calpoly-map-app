import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Map from "./Map";
import InteractBar from "./InteractBar";
import axios from "axios";

function Home() {
  const [allPins, setAllPins] = useState([]);
  const [searchedPins, setSearchedPins] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/pins`)
      .then((response) => {
        if (response && response.status === 200) {
          setAllPins(response.data.pins_list);
          setSearchedPins(response.data.pins_list);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function updateSearchedPins(newSearchedPins) {
    setSearchedPins(newSearchedPins);
  }

  return (
    <div>
      <SearchBar
        searchedPins={searchedPins}
        allPins={allPins}
        updateSearchedPins={updateSearchedPins}
      />
      <Map searchedPins={searchedPins} />
      <Map pins={searchedPins} />
      <InteractBar />
    </div>
  );
}
export default Home;
