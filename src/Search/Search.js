import React from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const Search = ({ searchTerm, setSearchTerm, onAddClick }) => {
  return (

    <Box
     style={{ display:"flex", 
     justifyContent:"flex-end",
     height:"60px", 
     width:"100%",
      alignItems:"center", 
      gridColumnGap:"18px", 
      // marginBottom:"0px", 
      // marginTop:"0px", 
      // marginRight:"0px"
    }}
     
    >
  
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: <SearchIcon style={{ marginRight: 0 }} />,
        }}
        className="search"
      />
       <Box className="buttonContainer">
      <Button variant="contained" color="primary" className="primary_button"   marginLeft="0px" tartIcon={<AddIcon />} onClick={onAddClick}>
       + Add Patients
      </Button>
      </Box>
    </Box>
    
  );
};

export default Search;