import React, {useState} from "react"
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    useMediaQuery,
    Button,
    Box,
  } from "@mui/material";

const CreateIncome =({handleSubmit, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
         sourcename: "",
        description: "",
        date: "",
        time:"",
        amount: "",
        paymentmethod:"",
        status: "",  

     });

     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

     return (
        <>
             <Grid container columnSpacing={2}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Source Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name=" Sourcename"
            value={formData.sourcename}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Description <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Date   <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Time <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="time"
            value={formData.validFrom}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
            <TextField
            label={
            <>
                Amount <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="amount"
            value={formData.validTo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid> <Grid item xs={12} sm={12} md={12}>
            <TextField
            label={
            <>
                Payment Method<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="paymentmethod"
            value={formData.validTo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            </Grid>

            <Box className="submit"sx={{display:'flex', justifyContent:'flex-end',gap:'10px',margin:'10px 0px 10px 10px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleSubmit} className="primary_button">
             Submit
            </Button>
            </Box>

        </>
     )
}

export default CreateIncome