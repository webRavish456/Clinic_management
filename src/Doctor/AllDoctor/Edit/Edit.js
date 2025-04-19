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
import { useNavigate, useParams } from "react-router-dom";
 
const schema = yup.object().shape({
    doctorName: yup.string().required("Doctor Name is required"),
    hospitalName:yup.string().required("Hospital Name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Date of birth is required"),
    mobileNumber: yup.string().required("Mobile number is required"),
    emailId: yup.string().required("Email ID is required"),
    experience: yup.string().required("Experience is required"),
    qualification: yup.string().required("Qualification is required"),
    address: yup.string().required("Address is required"),
    branchName: yup.string().required("Branch name is required"),
    specialization: yup.string().required("Specialization is required"),
    department:yup.string().required("Department is required"),
    salary:yup.string().required("Salary is required"),
    joiningDate: yup.string().required(" Joining date is required"),
    resumeCertificate: yup.string().required("Resume is required"),
    licenseCertificate:yup.string().required("Lincense is required"),
    highestQualificationCertificate: yup.string().required("Highest qualification certificate is required"),
    panCard: yup.string().required("Pan card is required"),
    aadharCard: yup.string().required("Aadhar card is required"),
    accountHolderName: yup.string().required("Account holder name is required"),
    accountNumber: yup.string().required("Account number is required"),
    bankName: yup.string().required("Bank name is required"),
    ifscCode: yup.string().required("IFSC code is required"),
    branch: yup.string().required("Branch  is required"),
    branchLocation: yup.string().required("Branch name is required"),
    });
const EditDoctor = () => {
   
       
    const { Id } = useParams();

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;
  
    const [loading, setLoading] = useState(false)

    const [loadingdata, setLoadingdata] = useState(true)

    const navigate= useNavigate()
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),

 });

    
 useEffect(() => {

    const fetchStaffData = async () => {
      try {
        const response = await fetch(`${Base_url}/doctor/${Id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.text();
        const res = JSON.parse(result);
  
  
        if (res.status === "success") {
          setLoading(false);
    
          reset({
            
            doctorName: res.data.doctorName|| "",
            hospitalName: res.data.hospitalName,
            gender: res.data.gender,
            dob: res.data.dob,
            mobileNumber: res.data.mobileNumber,
            emailId: res.data.emailId,
            experience: res.data.experience,
            qualification:res.data.qualification,
            address:res.data.address,
            branchName:res.data.companyDetails.branchName,
            salary: res.data.companyDetails.salary,
            specialization:res.data.companyDetails.specialization,
            joiningDate:res.data.companyDetails.joiningDate,
            department:res.data.companyDetails.department,
            accountHolderName:res.data.bankDetails.accountHolderName,
            accountNumber:res.data.bankDetails.accountNumber,
            bankName:res.data.bankDetails.bankName,
            ifscCode:res.data.bankDetails.ifscCode,
            branch:res.data.bankDetails.branch,
            branchLocation:res.data.bankDetails.branchLocation
        
         });
         setLoadingdata(false)
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
  
    if (loadingdata) {
      fetchDoctorData();
    }
  }, [loadingdata]);
    
    
    
  const onSubmit = (data) => {
    
    setLoading(true)


    const companyDetails = {
        salary: data.salary,
        branchName:data.branchName,
        designation:data.designation,
        joiningDate:data.joiningDate,
        department:data.department,
       
      };
     
      const bankDetails = {
        accountHolderName:data.accountHolderName,
        accountNumber:data.accountNumber,
        bankName:data.bankName,
        ifscCode:data.ifscCode,
        branch:data.branch,
        branchLocation:data.branchLocation
      }
      const formdata = new FormData();
       formdata.append("doctorName", data.staffName);
       formdata.append("gender", data.gender);
       formdata.append("dob", data.dob);

       formdata.append("companyDetails", JSON.stringify(companyDetails))
       formdata.append("bankDetails", JSON.stringify(bankDetails))

       formdata.append("mobileNumber", data.mobileNumber);
       formdata.append("emailId", data.emailId);
       formdata.append("experience", data.experience);
       formdata.append("qualification", data.qualification);
       formdata.append("address", data.address);

       
       formdata.append("documents.resumeCertificate", data.resumeCertificate[0]);
       formdata.append("documents.licenseCertificate", data.licenseCertificate[0]);
       formdata.append("documents.highestQualificationCertificate", data.highestQualificationCertificate[0]);
       formdata.append("documents.panCard", data.panCard[0]);
       formdata.append("documents.aadharCard", data.aadharCard[0]);
          
       
       const requestOptions = {
        method: "PATCH",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`, 
         },
      };

   fetch(`${Base_url}/doctor/${Id}`, requestOptions)
               .then((response) => response.text())
         
               .then((result) => {
         
                 const res = JSON.parse(result)
         
                 if(res.status==="success")
                 {
                   setLoading(false)
                  
                   toast.success(" Doctor Created Successfully!")
                   navigate("/doctor")
                   reset();
                 }
                 else {
                    setLoading(false)
                    toast.error(res.message)
          
                  }
                })
                .catch((error) => console.error(error));
        };
    
        const handleCancel = () =>
        {
             navigate("/doctor")
        }

       return (
        <>
            
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
                                <TextField
                                    label="Doctor Name"
                                    name="doctorName"
                                    value={formData.doctorName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Hospital Name"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    type="number"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                               
                                <TextField
                                    sx={{ marginTop: 2 }}
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
                                    label="Specialization"
                                    name="specialization"
                                    value={formData.specialization}
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
                            <Typography variant="body2">
                                View existing document: <a href="highestQualificationCertificate.pdf" target="_blank" rel="noopener noreferrer">highestQualificationCertificate.pdf</a>
                            </Typography>
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
                            <Typography variant="body2">
                                View existing document: <a href="resumeCertificate.pdf" target="_blank" rel="noopener noreferrer">resumeCertificate.pdf</a>
                            </Typography>
                        </Box>

                        <Box marginBottom={2}>
                            <TextField
                                label=" License Certificate"
                                name="licenseCertificate"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="normal"
                            />
                            <Typography variant="body2">
                                View existing document: <a href="licensecertificate.pdf" target="_blank" rel="noopener noreferrer">licenseCertificate.pdf</a>
                            </Typography>
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
                            <Typography variant="body2">
                                View existing document: <a href="aadhar.pdf" target="_blank" rel="noopener noreferrer">Aadhar.pdf</a>
                            </Typography>
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
                            <Typography variant="body2">
                                View existing document: <a href="panCard.pdf" target="_blank" rel="noopener noreferrer">PANCard.pdf</a>
                            </Typography>
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
                    <Button onClick={handleSubmit} className="primary_button">
                        Submit
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default EditDoctor;