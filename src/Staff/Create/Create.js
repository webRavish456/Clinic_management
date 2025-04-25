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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

 const schema = yup.object().shape({
    staffName: yup.string().required("Staff Name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Date of birth is required"),
    salary: yup.string().required("Salary is required"),
    mobileNumber: yup.string().required("Mobile number  is required"),
    emailId: yup.string().required("Email ID is required"),
    experience: yup.string().required("Experience is required"),
    qualification: yup.string().required("Qualification is required"),
    address: yup.string().required("address is required"),
    branchName: yup.string().required("Branch name is required"),
    designation: yup.string().required("Designation is required"),
    department: yup.string().required("Department is required"),
    shift: yup.string().required("Shift is required"),
    salary: yup.string().required("Salary is required"),
    joiningDate: yup.string().required("Joining date is required"),
    resumeCertificate: yup.string().required("Resume is required"),
    highestQualificationCertificate: yup.string().required("Highest qualification certificate is required"),
    panCard: yup.string().required("Pancard  is required"),
    aadharCard: yup.string().required("Aadhar card is required"),
    accountHolderName: yup.string().required("Account holder name is required"),
    bankName: yup.string().required("Bank name is required"),
    ifscCode: yup.string().required("IFSC code is required"),
    branchName: yup.string().required("Branch Name is required"),
    branchLocation: yup.string().required("Branch location is required"),
  });


const CreateStaff = () => {
    const token = Cookies.get('token');
   
       const Base_url = process.env.REACT_APP_BASE_URL;
     
       const [loading, setLoading] = useState(false)
     
       const {
         register,
         handleSubmit,
         formState: { errors },
         reset,
       } = useForm({
         resolver: yupResolver(schema),
   
    });

    const onSubmit = (data) => {
    
        setLoading(true)

       const formdata = new FormData();
       formdata.append("staffName", data.staffName);
       formdata.append("gender", data.gender);
       formdata.append("dob", data.dob);
       formdata.append("salary", data.salary);
       formdata.append("mobileNumber", data.mobileNumber);
       formdata.append("emailId", data.emailId);
       formdata.append("experience", data.experience);
       formdata.append("qualification", data.qualification);
       formdata.append("address", data.address);
       formdata.append("branchName", data.branchName);
       formdata.append("designation", data.designation);
       formdata.append("depatment", data.department);
       formdata.append("shift", data.shift);
       formdata.append("salary", data.salary);
       formdata.append("joiningDate", data.joiningDate);
       formdata.append(" resumeCertificate", data.resumeCertificate);
       formdata.append(" highestQualificationCertificate", data.highestQualificationCertificate);
       formdata.append(" panCard", data.panCard);
       formdata.append("aadharCard", data.aadharCard);
       formdata.append("accountHolderName ", data.accountHolderName);
       formdata.append("bankName", data.bankName);
       formdata.append("ifscCode ", data.ifscCode);
       formdata.append("branchName", data.branchName);
       formdata.append("branchLocation ", data.branchLocation);
   
   
       const requestOptions = {
         method: "POST",
         body: formdata,
         headers: {
           Authorization: `Bearer ${token}`, 
          },
       };

    fetch(`${Base_url}/staff`, requestOptions)
                .then((response) => response.text())
          
                .then((result) => {
          
                  const res = JSON.parse(result)
          
                  if(res.status==="success")
                  {
                    setLoading(false)
                   
                    toast.success("Staff Created Successfully!")
                    handleCreate(true)
                    handleClose()
                    reset();
                  }
                  else {
          
                    setLoading(false)
                    toast.error(res.message)
          
                  }
                })
                .catch((error) => console.error(error));
        };
    

    return (
        <>
           
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6} style={{ padding: "20px" }}>
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
                                <Box>
                                <TextField
                                    type="text"
                                    label={
                                        <>
                                        Staff Name
                                        </>
                                    }
                                    variant="standard"
                                    {...register("staffName")}
                                    error={!!errors.staffName}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.staffName?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                    type="number"
                                    label={
                                        <>
                                        Mobile Number
                                        </>
                                    }
                                    variant="standard"
                                    {...register("mobileNumber")}
                                    error={!!errors.mobileNumber}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.mobileNumber?.message}
                                    </div>
                                </Box>
                               
                               
                                <TextField
                                    sx={{ marginTop: 4 }}
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                 <FormControl component="fieldset">
                                    <FormLabel component="legend" sx={{ marginLeft: 2 }}>Gender</FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        row
                                    >
                                        <FormControlLabel value="male" control={<Radio sx={{ marginLeft: 2 }} />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio sx={{ marginLeft: 2 }} />} label="Female" />
                                        <FormControlLabel value="others" control={<Radio sx={{ marginLeft: 2 }} />} label="Others" />
                                    </RadioGroup>
                                </FormControl>
                                
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email ID"
                                    name="emailId"
                                    value={formData.emailId}
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
                            Company Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Branch Name"
                                    name="branchName"
                                    value={formData.staffName}
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
                                
                                
                            </Grid>
                            <Grid item xs={6}>
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
                                
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>


                <Grid item xs={6}>
                    <Box style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                        <Typography variant="h6" gutterBottom>
                            Document Details
                        </Typography>
                        {/* <Typography variant="subtitle2" gutterBottom>
                            Accepted formats: pdf, jpeg, jpg, png | Minimum file size: 100 KB
                        </Typography> */}
                        <Box marginBottom={2}>
                            <TextField
                                label=" Highest Qualification Certificate"
                                name="highestQualificationCertificate"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="normal"
                            />
                           
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                label="Resume"
                                name="resumeCertificate"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="normal"
                            />
                           
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                label="Aadhar Document"
                                name="aadharCard"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="normal"
                            />
                           
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                label="PAN Card Document"
                                name="panCard"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="normal"
                            />
                            
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                        <Typography variant="h6" gutterBottom>
                            Bank Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
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
                                    name="branch"
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
                        width: "100%", 
                    }}
                >
                    <Button onClick={handleClose} className="secondary_button" >
                        Cancel
                    </Button>
                    <Button type="submit" className="primary_button">
                        Submit
                    </Button>
                </Box>
            </Grid>
            </form>
        </>
    );
};

export default CreateStaff;