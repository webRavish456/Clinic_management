import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewRecords =()=>
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
            <Box className="pageTitle">Treatment:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Fever</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Date Of Admission:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">12/2/23</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Lab Reports:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">test type</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Doctor's Notes:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Notes</Box>
            </Grid>

            </Grid>
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">NextFollowUp:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Tommrow</Box>
            </Grid>

            </Grid>



            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Under observation</Box>
            </Grid>

            </Grid>



            </Grid>

        </>
     )
}

export default ViewRecords;