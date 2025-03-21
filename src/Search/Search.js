import React from 'react'
import {  InputAdornment,TextField,Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Search = () => {
  return (

<Box className='flex'>
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
        style={{ marginBottom: '20px',width:'200px' }}
      />


    <Button 
    variant="contained" 
   // color="primary" 
 //onClick={handleAddNew}
    style={{ marginBottom: '20px',marginLeft:'20px' ,backgroundColor:'rgb(6, 38, 75)'}}
  ><AddIcon/>
    Add New
  </Button>
  

  
  </Box>
  
      )
}

export default Search;