import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
 RadioGroup,
 FormControlLabel,
} from "@mui/material";
import {
  
  Cake,
  LocationOn,
  Person,
  Phone,
} from "@mui/icons-material";

const Profile = () => {
  const [ setTab] = useState(0);
  
  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Box p={3}>
      {/* <Typography variant="h6" fontWeight={600} mb={2}>
         My Profile
       </Typography> */}

      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: 1,
          borderRadius: 2,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Profile Header */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} display="flex" alignItems="center">
            <Avatar sx={{ width: 74, height: 74, mr: 2 }}>SC</Avatar>
            <Box>
              <Typography variant="h6">Super Admin</Typography>
              <Button variant="contained" size="small" sx={{ mt: 1 }}>
                Active
              </Button>
              {/* <Typography color="text.secondary">superadmin@gmail.com</Typography> */}
              {/* <Typography color="primary">superAdmin</Typography> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" alignItems="center">
                  <Phone sx={{ mr: 1 }} />
                  <Typography>
                    <strong>Contact:</strong> 9876543211
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={8} sm={4}>
                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography>
                    <strong>Address:</strong> Ujjain
                  </Typography>
                  
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center">
                  <Cake sx={{ mr: 1 }} />
                  <Typography>
                    <strong>Date of birth:</strong> 31-10-1979
                  </Typography>
                </Box>
              </Grid> */}
            </Grid> 


            <Grid container spacing={2}>

            <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" alignItems="center" >
                  <Cake sx={{ mr: 1 }} />
                  <Typography>
                    <strong>Date of birth:</strong> 31-10-1979
                  </Typography>
                </Box>
              </Grid> 
                
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" alignItems="center" >
                  <Person sx={{ mr: 1 }} />
                  <Typography>
                    <strong>Role Type:</strong> SuperAdmin
                  </Typography>
                </Box>
              </Grid> 


                  
            </Grid> 
         
          </Grid>
        </Grid>

        
</Box >
        
     <Box p={3} sx={{backgroundColor:"white", marginTop:"15px"}}>
          <Box mt={2}>
            <Typography variant="h6" mb={2}>
              Personal Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="First Name" value="Super" />
              </Grid>
              <Grid item xs={12}>
          <RadioGroup
            row
            name="gender"
           // value={formData.gender}
            
          >
            <FormControlLabel
              value="Male"
              control={<Radio/>}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio/>}
              label="Female"
            />
          </RadioGroup>
        </Grid>

              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Email" value="superadmin@gmail.com" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Contact Number" value="87976756" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Address" value="Sakchi" />
              </Grid>
             
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }}>
              Edit
            </Button>
          </Box>
        

       

    
      </Box>
    </Box>
  );
};

export default Profile;