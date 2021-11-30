import React, { useState, useRef } from "react";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import axios from "axios";
import style from "../styles/SearchBar.module.css";

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const searchInput = useRef(null);

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

  function handleBlur() {
    setSearching(false);
  }

  function handleQueryClick(id) {
    let newSearchedPins = props.searchedPins.filter((pin) => pin._id === id);
    props.updateSearchedPins(newSearchedPins);
    setQuery(newSearchedPins[0].title);
    setSearching(false);
  }

  function handleIconClick() {
    searchInput.current.focus();
    setSearching(true);
  }

  return (
    <div className={style.search}>
      <div className={style.searchBox}>
        <button className={style.searchIconWrapper} onClick={handleIconClick}>
          <SearchIcon className={style.searchIcon} />
        </button>
        <label htmlFor="search" />
        <input
          ref={searchInput}
          className={style.searchInput}
          type="text"
          id="search"
          name="search"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
      {!searching
        ? null
        : props.searchedPins.slice(0, 4).map((pin) => (
            <button
              className={style.searchResult}
              key={pin._id}
              // onMouseDown has higher precedence than onClick (fixes issue with input focus)
              onMouseDown={() => {
                handleQueryClick(pin._id);
              }}
            >
              {pin.title}
            </button>
          ))}
    </div>
  );
}

export default SearchBar;
