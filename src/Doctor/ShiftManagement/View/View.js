import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewShiftManagement =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Name:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">Amrita</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Department:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Eye</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Specialization:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">Eye Specialist</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift Start Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">12/5/16</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift End Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">19/5/16</Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Work Days:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Monday-Friday</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift Hours:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">8</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift Type:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">A</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Availability Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Active</Box>
            </Grid>

            </Grid>




            </Grid>

        </>
     )
}

export default ViewShiftManagement