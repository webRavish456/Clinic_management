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
            <Box className="pageTitle">DoctorName:</Box> 
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
            <Box className="pageDescription">Cardiologist</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Specialization:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">Heart</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">ShiftStartDate:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">1/1/20</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">ShiftEndDate:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">7/1/20</Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">WorkDays:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Monday-Friday</Box>
            </Grid>

            </Grid><Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

      <Grid item xs={6}>
         <Box className="pageTitle">ShiftHours:</Box>
        </Grid>

         <Grid item xs={6}>
         <Box className="pageDescription">12</Box>
          </Grid>
          </Grid><Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

      <Grid item xs={6}>
         <Box className="pageTitle">ShiftType:</Box>
        </Grid>

         <Grid item xs={6}>
         <Box className="pageDescription">A</Box>
          </Grid>
            </Grid>

            
           

            </Grid>

        </>
     )
}

export default ViewShiftManagement;