import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewShiftManagement =({viewData})=>
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
            <Box className="pageDescription">{viewData.doctorName}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Department:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.department}</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Specialization:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.specialization}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift Start Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{new Date(viewData.shiftStartDate).toLocaleDateString("en-IN")}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift End Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{new Date(viewData.shiftEndDate).toLocaleDateString("en-IN")}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Work Days:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.workDays}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift Hours:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.shiftHours}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Shift Type:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.shiftType}</Box>
            </Grid>

            </Grid>
            
            </Grid>

        </>
     )
}

export default ViewShiftManagement;