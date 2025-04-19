import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewLabTest =({viewData})=>
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
            <Box className="pageDescription">{viewData.patientName}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Mobile No:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.mobileNo}</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Gender:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.gender}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Treatment:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.treatment}</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Test Name:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.testName}</Box>
</Grid>

</Grid>
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
<Box className="pageTitle">Assigned Lab Technician:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.assignedLabTechnician}</Box>
</Grid>

</Grid>
<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Sample Collected On:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.sampleCollected}</Box>
</Grid>

</Grid>
            
<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Result:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.result}</Box>
</Grid>

</Grid>          


            

           

           


            </Grid>

        </>
     )
}

export default ViewLabTest;