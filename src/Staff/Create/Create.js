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

const CreateLaboratory =({handleSubmit, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        labname: "",
        discountDescription: "",
        discountValue: "",
        validFrom: "",  
        validTo: "",
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
                Lab Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="labname"
            value={formData.labname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Discount Description <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="discountDescription"
            value={formData.discountDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Discount Value <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="discountValue"
            value={formData.discountValue}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Valid From <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="validFrom"
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
                Valid To <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="validTo"
            value={formData.validTo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            </Grid>

            <Box className="submit">
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleSubmit} className="primary_button">
             Submit
            </Button>
            </Box>

        </>
     )
}

export default CreateLaboratory