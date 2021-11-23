import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./searchBar.css";

const SearchBar = ({ callMaboxGeocoding, setLocalePlace }) => {
  const [keyWord, setKeyWord] = useState("");
  const [isKeyWordUpdate, setIsKeyWordUpdate] = useState(false);

  const handleClick = () => {
    if (keyWord !== "" && !isKeyWordUpdate) {
      callMaboxGeocoding(keyWord);
      setIsKeyWordUpdate(true);
    }
    if (isKeyWordUpdate) {
      setLocalePlace({});
      setIsKeyWordUpdate(false);
    }
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value);
    setIsKeyWordUpdate(false);
  };

  return (
    <Paper
      sx={{ p: "2px 6px", display: "flex", alignItems: "center" }}
      style={{
        height: "50px",
        borderRadius: "16px",
        margin: "20px 20px 15px 20px",
        boxShadow: "none",
      }}
    >
      <InputBase
        className="test"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Rechercher"
        onChange={handleChange}
      />

      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleClick}
        style={{
          backgroundColor: "#EBA701",
          borderRadius: "8px",
          color: "white",
        }}
      >
        {isKeyWordUpdate ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
