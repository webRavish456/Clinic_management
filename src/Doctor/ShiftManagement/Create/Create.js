import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    Typography,
    Button,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel
} from "@mui/material";

const CreateShiftManagement = ({ handleSubmit, handleClose }) => {
    const [formData, setFormData] = useState({
        doctorName: "",
        department: "",
        specialization: "",
        shiftStartDate: "",  
        shiftEndDate: "",
        workDays:"",
        shiftHours: "",
        shiftType: "",
         });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
        

        
        
            <Typography variant="h5" gutterBottom sx={{ marginLeft: 2, marginTop: 4 }}>
                Create Shift Management
            </Typography>
            <Grid container spacing={6} style={{ padding: "20px" }}>
                
                <Grid item xs={6}>
                    <Box
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                    >
                        
                        
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                               
                                </Grid>
            
             <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Doctor Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
            <Select name="Doctor Name" value={formData.status} onChange={handleChange}>
            <MenuItem value="Shruti">Shruti</MenuItem>
            <MenuItem value="Arohi">Arohi</MenuItem>
            <MenuItem value="Sara">Sara</MenuItem>
            </Select>
            </FormControl>
                                           
                                
                               
                                </Grid>
            <Grid item xs={6}>  
            <FormControl fullWidth margin="normal">
            <InputLabel>Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
            <Select name="Department" value={formData.status} onChange={handleChange}>
            <MenuItem value="Skin">Skin</MenuItem>
            <MenuItem value="Heart">Heart</MenuItem>
            <MenuItem value="Eye">Eye</MenuItem>
            </Select>
            </FormControl>

                                </Grid>
            
           <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Specialization<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
            <Select name="Specialization" value={formData.status} onChange={handleChange}>
            <MenuItem value="Skin Specialist">Skin Specialist</MenuItem>
            <MenuItem value="Heart Specialist">Heart Specialist</MenuItem>
            <MenuItem value="Eye Specialist">Eye Specialist</MenuItem>
            </Select>
            </FormControl>
                                            
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Shift Start Date"
                                    name="shiftStartDate"
                                    value={formData.shiftStartDate}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    />
                                    <TextField
                                    label="Shift End Date"
                                    name="shiftEndDate"
                                    value={formData.shiftEndDate}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Work Days"
                                    name="workDays"
                                    value={formData.workDays}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Shift Hours"
                                    name="shifthours"
                                    value={formData.shiftHours}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Shift Type"
                                    name="shiftType"
                                    value={formData.shiftType}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                

                

                </Grid>
                <Box
                    className="submit"
                    sx={{
                        display: "flex",
                        gap: 2,
                        marginTop: 2,
                        justifyContent: "flex-end",
                        width: "100%", // Ensure the box spans the full width
                    }}
                >
                    <Button onClick={handleClose} className="secondary_button" >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="primary_button">
                        Submit
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default CreateShiftManagement;