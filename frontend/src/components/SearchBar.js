import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import axios from "axios";

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  function handleChange(event) {
    const newQuery = event.target.value;
    setQuery(newQuery);
    axios
      .get(`${process.env.REACT_APP_API_HOST}/pins?title=${newQuery}`)
      .then((response) => {
        if (response && response.status === 200) {
          props.updateSearchedPins(response.data.pins_list);
        }
      })
      .catch((error) => console.log(error));
  }

  function handleFocus() {
    setSearching(true);
  }

  function handleQueryClick(id) {
    let newSearchedPins = props.searchedPins.filter((pin) => pin._id === id);
    props.updateSearchedPins(newSearchedPins);
    setQuery(newSearchedPins[0].title);
    setSearching(false);
  }

  return (
    <div>
      <SearchIcon />
      <label htmlFor="search" />
      <input
        type="text"
        id="search"
        name="search"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        autoComplete="off"
      />
      {!searching
        ? null
        : props.searchedPins.slice(0, 4).map((pin) => (
            <div
              key={pin._id}
              onClick={() => {
                handleQueryClick(pin._id);
              }}
            >
              {pin.title}
            </div>
          ))}
    </div>
  );
}

export default SearchBar;
