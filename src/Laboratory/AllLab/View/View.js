import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewLab =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Lab Name</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">Health Trust Lab</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Lab Type:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Clinical Laboratory</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Assignee Staff:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">Aashu kumari</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Morning</Box>
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

export default ViewLab;