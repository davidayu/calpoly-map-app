import React, { useState, useEffect } from "react";
import style from "../styles/Home.module.css";
import SearchBar from "./SearchBar";
import Map from "./Map";
import InteractBar from "./InteractBar";
// import Legend from "./Legend";
import axios from "axios";

function Home() {
  const [searchedPins, setSearchedPins] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/pins`)
      .then((response) => {
        if (response && response.status === 200) {
          setSearchedPins(response.data.pins_list);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function updateSearchedPins(newSearchedPins) {
    setSearchedPins(newSearchedPins);
  }

  return (
    <div className={style.home}>
      <SearchBar
        searchedPins={searchedPins}
        updateSearchedPins={updateSearchedPins}
      />
      <Map pins={searchedPins} height="100vh" />
      <InteractBar />
      {/* <Legend /> */}
    </div>
  );
}

export default Home;
