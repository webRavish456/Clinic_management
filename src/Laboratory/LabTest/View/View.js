import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewLaboratory =()=>
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
            <Box className="pageDescription">Shanu</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Doctor Assignee:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Shruti</Box>
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
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Scheduled</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Checkup:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Fever</Box>
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

export default ViewLaboratory;