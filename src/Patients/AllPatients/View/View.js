import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewPatients =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">patientName:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">snehanjali</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">BloodGroup:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">A+</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Gender:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">female</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Age:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">15</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">MobileNo:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">9789876789</Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Email:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Sneha12@gmail.com</Box>
            </Grid>

            </Grid><Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Address:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">Ranchi</Box>
</Grid>

</Grid>
<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Treatment:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">illness</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">doctor Assigned:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">subhashree</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Admission Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">12/12/12</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Recovered</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Medical History:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Previous Report</Box>
            </Grid>

            </Grid>
           

            </Grid>

        </>
     )
}

export default ViewPatients;