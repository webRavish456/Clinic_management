import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewAllDoctor =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Doctor Name:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">Amrita</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Email:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">amrita@123</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Mobile No:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">9632154871</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Address:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Ranchi</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Specialization:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Eye</Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Experience:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">8</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Qualification:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">MBBS</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Hospital Name:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">Aims</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Availability:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">Yes</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Joinig Date:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">1/5/12</Box>
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
            



            </Grid>

        </>
     )
}

export default ViewAllDoctor