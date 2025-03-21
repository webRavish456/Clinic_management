import React from 'react'
import {  InputAdornment,TextField,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
<div className='flex'>
    <TextField
           className='search'
          size='small'
        label="Search"
        variant="outlined"
       // fullWidth
      //  value={searchQuery}
       // onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
   
      />


    <Button 
    variant="contained" 
   // color="primary" 
 //onClick={handleAddNew}
 className='primary_button'
  >
    Add New
  </Button>
  

  
  </div>
  
      )
}

export default Search;