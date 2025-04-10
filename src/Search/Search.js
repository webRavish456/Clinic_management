import React from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";


const Search = ({ searchTerm, setSearchTerm, onAddClick }) => {
 

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center",
        gridColumnGap: "20px",
        marginBottom: "10px",
        marginTop: "10px",
        marginRight: "0px",
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: <SearchIcon style={{ marginRight: 0 }} />, // Keeping original design
        }}
        className="search"
      />

      <Box className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          className="primary_button"
          marginLeft="0px"
          onClick={onAddClick}
        >
          <AddIcon /> {/* Keeping original design */}
          Add New
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
