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

const ViewStaff = ({ handleSubmit, handleClose }) => {
    const [formData, setFormData] = useState({
        staffName: "",
        gender: "",
        department:"",
        dob: "",
        salary:"",
        mobileNo: "",
        email: "",
        experience: "",
        qualification: "",
        address: "",
        branchName: "",
        designation: "",
        shift: "",
        joiningDate: "",
        resumeCertificate: "",
        highestQualificationCertificate: "",
        panCard: "",
        aadharCard: "",
        accountHolderName: "",
        accountNumber: "",
        bankName: "",
        ifscCode: "",
        bankBranch: "",
        branchLocation: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Grid container spacing={3} style={{ padding: "20px" }}>
                {/* Personal Details */}
                <Grid item xs={6}>
                    <Box
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Personal Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Staff Name"
                                    name="staffName"
                                    value={formData.staffName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Mobile Number"
                                    name="mobileNo"
                                    type="number"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                                <TextField
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email ID"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/* Company Details */}
                <Grid item xs={6}>
                    <Box style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                        <Typography variant="h6" gutterBottom>
                            Company Details
                        </Typography>
                        <TextField
                            label="Branch Name"
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Shift"
                            name="shift"
                            value={formData.shift}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        
                        
                        
                        <TextField
                            label="Salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Joining Date"
                            name="joiningDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.joiningDate}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                </Grid>

                {/* Document Details */}
                <Grid item xs={6}>
                    <Box style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                        <Typography variant="h6" gutterBottom>
                            Document Details
                        </Typography>
                        <TextField
                            label="Resume Certificate"
                            name="resumeCertificate"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Highest Qualification Certificate"
                            name="highestQualificationCertificate"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Pan Card"
                            name="panCard"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Aadhar Card"
                            name="aadharCard"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                </Grid>

                {/* Bank Details */}
                <Grid item xs={6}>
                    <Box style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                        <Typography variant="h6" gutterBottom>
                            Bank Details
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <TextField
                            label="Account Holder Name"
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Account Number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bank Name"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            label="IFSC Code"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Bank Branch"
                            name="bankBranch"
                            value={formData.bankBranch}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Branch Location"
                            name="branchLocation"
                            value={formData.branchLocation}
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

export default ViewStaff;