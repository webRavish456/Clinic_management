import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewAppointment =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Patient Name:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">Saniya Singha</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Doctor:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Shruti</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Gender:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Female</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Appointment Date:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">24-03-2025</Box>
            </Grid>

            </Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Time:</Box> 
</Grid>   
<Grid item xs={6}>
<Box className="pageDescription">10:00AM</Box>

</Grid>



</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Mobile:</Box> 
</Grid>   
<Grid item xs={6}>
<Box className="pageDescription">62000000789</Box>

</Grid>



</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Email:</Box> 
</Grid>   
<Grid item xs={6}>
<Box className="pageDescription">saniya0987@gmail.com</Box>

</Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Pending</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Visit Type:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">In person Visit</Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle"></Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription"></Box>
            </Grid>

            </Grid>



            </Grid>

        </>
     )
}

export default ViewAppointment