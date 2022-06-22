import React from "react";

import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { SearchContext } from "./../../App";

function Search() {
  const { setSearchValue } = React.useContext(SearchContext);

  // Local state just for create controll input
  const [value, setValue] = React.useState("");

  const inputRef = React.useRef();

  const onClickClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };

  const changeWithDelay = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const searchHandler = (e) => {
    setValue(e.target.value);
    changeWithDelay(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        onChange={(e) => searchHandler(e)}
        value={value}
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.close}
          viewBox="0 0 20 19.84"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
