import React, { useEffect,useState } from "react";
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
import { NavLink, useParams } from "react-router-dom";
import Cookies from "js-cookie";


const ViewDoctor = () => {

    const { Id } = useParams();

    const token = Cookies.get("token");
    const Base_url = process.env.REACT_APP_BASE_URL;

    const [loading, setLoading] = useState(true);

    const [formData, setformData] =useState([])

    useEffect(() => {

        const fetchDoctorData = async () => {
          try {
            const response = await fetch(`${Base_url}/alldoctor/${Id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const result = await response.text();
            const res = JSON.parse(result);
      
      
            if (res.status === "success") {
              setLoading(false);
              console.log("data", res.data)
              setformData(res.data)
       
            }
          } catch (error) {
            console.error("Error fetching doctor data:", error);
          }
        };
      
        if (loading) {
          fetchDoctorData();
        }
      }, [loading]);

    
    return (
     
            <Box className="overflow">      
            <Grid container spacing={6} padding={3}>
   
             <Grid item xs={12} md={6}>
   
             <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 3, backgroundColor:"#ffffff" }}>
     
               <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <TextField 
                             fullWidth 
                             label="Doctor Name" 
                             value={formData.doctorName || ""} 
                             margin="normal" />
             
                            
                            <TextField
                                fullWidth 
                                label="Mobile Number" 
                                value={formData.mobileNumber || ""} 
                                margin="normal" />
                      
                               
                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    InputLabelProps={{ shrink: true }}
                                    value={
                                        formData.dob
                                        ? new Date(formData.dob).toLocaleDateString("en-GB")
                                        : ""
                                    }
                                    margin="normal"
                                    />
                                
                                <FormControl component="fieldset" margin="normal">
                              <FormLabel>Gender</FormLabel>
                              <RadioGroup row value={formData.gender || ""}>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="others" control={<Radio />} label="Others" />
                              </RadioGroup>
                            </FormControl>
                                
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth 
                                    label="Email ID"
                                     value={formData.emailId || ""}
                                    margin="normal" />
                      
                                
                                 
                                <TextField
                                    fullWidth
                                    label="Experience"
                                     value={formData.experience || ""}
                                     margin="normal" />
                     
                                <TextField
                                    fullWidth 
                                    label="Qualification"
                                     value={formData.qualification || ""}
                                      margin="normal" />
                                
                                <TextField
                                    fullWidth
                                    label="Address" 
                                    value={formData.address || ""} 
                                    margin="normal" />
                     
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>

        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 3, backgroundColor:"#ffffff" }}>
          <Typography variant="h6" gutterBottom>
            Company Details
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField fullWidth label="Branch Name" value={formData.companyDetails?.branchName || ""} margin="normal" />
              <TextField fullWidth label="Department" value={formData.companyDetails?.department || ""} margin="normal" />
              <TextField fullWidth  label="Joining Date" InputLabelProps={{ shrink: true }} value={
                    formData.companyDetails
                    ? new Date(formData.companyDetails.joiningDate).toLocaleDateString("en-GB")
                    : ""
                } margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Salary" value={formData.companyDetails?.salary || ""} margin="normal" />
              <TextField fullWidth label="Specialization" value={formData.companyDetails?.specialization || ""} margin="normal" />
              
            </Grid>
          </Grid>

        </Box>

      </Grid>
                              
      <Grid item xs={12} md={6}>
      <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 3,backgroundColor:"#ffffff" }}>
          <Typography variant="h6" gutterBottom>
            Document Details
          </Typography>
          {[
            { label: "Highest Qualification Certificate", name: "highestQualificationCertificate", file: "certificate.pdf" },
            { label: "Resume", name: "resumeCertificate", file: "resume.pdf" },
            { label: "License Certificate", name: "licenseCertificate", file: "licenseCertificate.pdf" },
            { label: "Aadhar Document", name: "aadharCard", file: "aadhar.pdf" },
            { label: "PAN Card Document", name: "panCard", file: "panCard.pdf" }
          ].map(({ label, name, file }) => (
           
            <Box key={name} mb={2}>
              <TextField fullWidth label={label} type="file" InputLabelProps={{ shrink: true }} margin="normal"  disabled />
              <Typography variant="body2">
                View existing document: <NavLink to={formData.documents?.[name]} target="_blank" rel="noopener noreferrer">{file}</NavLink>
              </Typography>
            </Box>
          ))}
        </Box>

      </Grid>           
                

      <Grid item xs={12} md={6}>

        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 3, backgroundColor:"#ffffff" }}>
           <Typography variant="h6" gutterBottom>
            Bank Details
           </Typography>
           <Grid container spacing={2}>
           <Grid item xs={12}>
             <TextField fullWidth label="Account Holder Name" value={formData.bankDetails?.accountHolderName || ""} margin="normal" />
             <TextField fullWidth label="Account Number" value={formData.bankDetails?.accountNumber || ""} margin="normal" />
             <TextField fullWidth label="Bank Name" value={formData.bankDetails?.bankName || ""} margin="normal" />
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth label="IFSC Code" value={formData.bankDetails?.ifscCode || ""} margin="normal" />
            <TextField fullWidth label="Bank Branch" value={formData.bankDetails?.branch || ""} margin="normal" />
            <TextField fullWidth label="Branch Location" value={formData.bankDetails?.branchLocation || ""} margin="normal" />
            </Grid>
           </Grid>
         </Box>
    </Grid>
 </Grid>
 </Box> 

    
     );
};           
 
export default ViewDoctor;