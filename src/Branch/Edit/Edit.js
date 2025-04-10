import React, {useState} from "react"
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    useMediaQuery,
    Box,
    Button,
  } from "@mui/material";

const EditBranch =({handleUpdate, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        discountCode: "",
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

            <Grid item xs={12} sm={12} md={12}>

            <TextField
            label={
            <>
                Branch Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>

            <TextField
            label={
            <>
                Branch Location <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="branchLocation"
            value={formData.branchLocation}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={12} md={12}>
            <TextField
            label={
            <>
                Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            </Grid>

            <Box className="submit"  sx={{ display: "flex", justifyContent: "flex-end",gap: 2, mt: 2,  }}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleUpdate} className="primary_button">
             Update
            </Button>
            </Box>

        </>
     )
}

export default EditBranch;