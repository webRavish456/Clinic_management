import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewDiscount =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Discount Code:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">FESTIVE50</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Discount Description:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Flat 50% off on festive season</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Discount Value:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">50%</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Valid From:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">15-03-2025</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Valid To:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">25-03-2025</Box>
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

export default ViewDiscount