import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewIncome =()=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Income id:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">INC001</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Source Name:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Patient Payment</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Description:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">Consulation Fees</Box>
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
<Box className="pageTitle">Time:</Box> 
</Grid>   
<Grid item xs={6}>
<Box className="pageDescription">10:00AM</Box>

</Grid>



</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Amount:</Box> 
</Grid>   
<Grid item xs={6}>
<Box className="pageDescription">500</Box>

</Grid>



</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Payment Method:</Box> 
</Grid>   
<Grid item xs={6}>
<Box className="pageDescription">credit card</Box>

</Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">Pending</Box>
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

export default ViewIncome