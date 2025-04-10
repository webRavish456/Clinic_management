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
import ShiftManagement from "../ShiftManagement";

const CreateShiftManagement =({handleUpdate, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        name: "",
        department: "",  
        specialization: "",
        shiftStartDate: "",
        shiftEndDate: "",
        workDays: "",
        shiftHours: "",
        shiftType: "",
        availabilityStatus: "",
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
                 Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Department <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift Start Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shiftstartdate"
            value={formData.shiftStartDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift End Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shiftenddate"
            value={formData.shiftEndDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Work Days <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="workdays"
            value={formData.workDays}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift Hours <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shifthours"
            value={formData.shiftHours}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shifttype"
            value={formData.shiftType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Availability Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="availabilitystatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            
            
            
            </Grid>
            </Grid>

            <Box className="submit"sx={{display:'flex', justifyContent:'flex-end',gap:'10px',margin:'10px 0px 10px 10px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleUpdate} className="primary_button">
             Update
            </Button>
            </Box>

        </>
     )
}

export default CreateShiftManagement