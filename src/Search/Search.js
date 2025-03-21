import React from 'react'
<<<<<<< HEAD
import {  InputAdornment,TextField,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
<div className='flex'>
    <TextField
           className='search'
          size='small'
=======
import {  InputAdornment,TextField,Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Search = () => {
  return (

<Box className='flex'>
    <TextField
           className='search'
size='small'
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
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
<<<<<<< HEAD
   
=======
        style={{ marginBottom: '20px',width:'200px' }}
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
      />


    <Button 
    variant="contained" 
   // color="primary" 
 //onClick={handleAddNew}
<<<<<<< HEAD
 className='primary_button'
  >
=======
    style={{ marginBottom: '20px',marginLeft:'20px' ,backgroundColor:'rgb(6, 38, 75)'}}
  ><AddIcon/>
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
    Add New
  </Button>
  

  
<<<<<<< HEAD
  </div>
=======
  </Box>
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
  
      )
}

export default Search;