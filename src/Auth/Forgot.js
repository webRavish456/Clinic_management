import React from "react";
import {Box, Button, TextField} from "@mui/material"

const Forgot=()=>
{
      return (
        <>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off" className="register">

            <Box className="header_title">Forgot</Box>     

            <Box className="Forgot">  

           <TextField
           type="email"
           required
           id="email"
           variant="standard"
           label="Enter Email Id"
        />

         <TextField
          type="password"
          required
           variant="standard"
          id="password"
          label="Enter Password"
        />
            
         <Box className="forgot_password">
            <Box className="forgot">Forgot Password</Box>
         </Box>
          
<<<<<<< HEAD
          <Button className="primary_button">Forgot</Button>
=======
          <Button className="primary_button">Register</Button>
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
            
         <Box className="account">
            <Box>Already an account</Box>
            <Box className="forgot">Login</Box>
         </Box>

          </Box> 
        
        </Box> 
        </>
      )
}

export default Forgot;