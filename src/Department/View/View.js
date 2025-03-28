import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewDepartment =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Department Id:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">01</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Department Name:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Cardiology</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Specialization:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">Cardiovascular Medicine</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Department Head:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Dr. A</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Description:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Deals with heart related diseases</Box>
            </Grid>


            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Status:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">Active</Box>
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

export default ViewDepartment