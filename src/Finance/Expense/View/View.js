import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewExpense =({viewData})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Expense Category:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.expensecategory}</Box>
            </Grid>

           
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Payee Name:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.payeeName}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle"> Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.date}</Box>
            </Grid>

            
            </Grid>

            


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Amount:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.amount}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Payment Method:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.paymentMethod}</Box>
            </Grid>

            </Grid>

            
            </Grid>



          

        </>
     )
}

export default ViewExpense;