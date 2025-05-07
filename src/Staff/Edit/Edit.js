import React, { useEffect, useState } from "react";
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
    FormLabel,
    CircularProgress 
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { NavLink, useNavigate, useParams } from "react-router-dom";
 


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
    shift: yup.string().required("Shift is required"),
    salary: yup.string().required("Salary is required"),
    joiningDate: yup.string().required("Joining date is required"),
    resumeCertificate: yup.mixed().required("Resume is required"),
    highestQualificationCertificate: yup.mixed().required("Highest qualification certificate is required"),
    panCard: yup.mixed().required("Pancard  is required"),
    aadharCard: yup.mixed().required("Aadhar card is required"),
    accountHolderName: yup.string().required("Account holder name is required"),
    bankName: yup.string().required("Bank name is required"),
    ifscCode: yup.string().required("IFSC code is required"),
    branch: yup.string().required("Branch is required"),
    branchLocation: yup.string().required("Branch location is required"),
  });


const EditStaff = () => {

      const { Id } = useParams();

       const token = Cookies.get('token');

       const [branch, setBranch] = useState([])

       const Base_url = process.env.REACT_APP_BASE_URL;
     
       const [loading, setLoading] = useState(false)

       const [loadingdata, setLoadingdata] = useState(true)

       const [existingDocuments, setExistingDocuments] = useState({});

       const [gender, setGender]=useState([])
       
       const [editData, setEditData] =useState([])

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
        const fetchBranchData = async () => {
          try {
            const response = await fetch(`${Base_url}/branch`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            const result = await response.text();
            const res = JSON.parse(result);
      
            if (res.status === "success") {
              const formattedData = res.data.map((item) => item.branchName);
              setBranch(formattedData);
            }
          } catch (error) {
            console.error("Error fetching branch data:", error);
          }
        };
      
        const fetchStaffData = async () => {
          try {
            const response = await fetch(`${Base_url}/staff/${Id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            const result = await response.text();
            const res = JSON.parse(result);
      
            setGender(res.data.gender);

      
            if (res.status === "success") {
              reset({
                staffName: res.data.staffName,
                gender: res.data.gender,
                dob: res.data.dob ? new Date(res.data.dob).toISOString().split("T")[0] : "",
                mobileNumber: res.data.mobileNumber,
                emailId: res.data.emailId,
                experience: res.data.experience,
                qualification: res.data.qualification,
                address: res.data.address,
                salary: res.data.companyDetails.salary,
                branchName: res.data.companyDetails.branchName,
                designation: res.data.companyDetails.designation,
                joiningDate: res.data.companyDetails.joiningDate
                  ? new Date(res.data.companyDetails.joiningDate).toISOString().split("T")[0]
                  : "",
                shift: res.data.companyDetails.shift,
                accountHolderName: res.data.bankDetails.accountHolderName,
                accountNumber: res.data.bankDetails.accountNumber,
                bankName: res.data.bankDetails.bankName,
                ifscCode: res.data.bankDetails.ifscCode,
                branch: res.data.bankDetails.branch,
                branchLocation: res.data.bankDetails.branchLocation,
              });
      
              setEditData(res.data)
              setExistingDocuments(res.data.documents || {});
            }
          } catch (error) {
            console.error("Error fetching staff data:", error);
          }
        };
      
        const fetchData = async () => {
          try {
            await Promise.all([fetchBranchData(), fetchStaffData()]);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
        
            setLoadingdata(false);
          }
        };
      
        if ( loadingdata) {
          fetchData();
        }
      }, [loadingdata]);
      

 

    const onSubmit = (data) => {
    
        setLoading(true)
    

        const companyDetails = {
            salary: data.salary,
            branchName:data.branchName,
            designation:data.designation,
            joiningDate:data.joiningDate,
            shift:data.shift
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
       formdata.append("staffName", data.staffName);
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

    fetch(`${Base_url}/staff/${Id}`, requestOptions)
                .then((response) => response.text())
          
                .then((result) => {
          
                  const res = JSON.parse(result)
          
                  if(res.status==="success")
                  {
                    setLoading(false)
                   
                    toast.success("Staff Created Successfully!")
                    navigate("/staff")
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
             navigate("/staff")
        }

    return (
        <>
          {!loadingdata &&
            <Box className="overflow"> 
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Typography variant="h6" gutterBottom>
                            Personal Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                           
                                    label={
                                        <>
                                        Staff Name
                                        </>
                                    }
                                   
                                    {...register("staffName")}
                                    error={!!errors.staffName}
                              
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.staffName?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                    label={
                                        <>
                                        Mobile Number
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("mobileNumber")}
                                    error={!!errors.mobileNumber}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.mobileNumber?.message}
                                    </div>
                                </Box>
                                <Box>
                               

                                <TextField
                                    InputLabelProps={{shrink:true}}
                                    type="date"
                                    label={
                                        <>
                                        Date of Birth
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("dob")}
                                    error={!!errors.dob}
                                    fullWidth
                                    margin="normal"
                                    />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.dob?.message}
                                    </div>
                                </Box>
                               
                    <FormControl component="fieldset" fullWidth margin="normal" error={!!errors.gender}>

                    <FormLabel component="legend" sx={{ marginLeft: 2 }}>Gender</FormLabel>

                       <RadioGroup row defaultValue={gender}>
                        <FormControlLabel
                            value="male"
                            control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="female"
                            control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
                            label="Female"
                        />
                        <FormControlLabel
                            value="others"
                            control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
                            label="Others"
                        />
                    </RadioGroup>
                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                        {errors.gender?.message}
                    </div>

            </FormControl>

                                
                            </Grid>
                            <Grid item xs={6}>
                            <Box>
                                <TextField
                                InputLabelProps={{shrink:true}}
                                    type="text"
                                    label={
                                        <>
                                        Email ID
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("emailId")}
                                    error={!!errors.emailId}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.emailId?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                InputLabelProps={{shrink:true}}
                                    type="text"
                                    label={
                                        <>
                                        Experience
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("experience")}
                                    error={!!errors.experience}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.experience?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                InputLabelProps={{shrink:true}}
                                    type="text"
                                    label={
                                        <>
                                        Qualification
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("qualification")}
                                    error={!!errors.qualification}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.qualification?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Address
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("address")}
                                    error={!!errors.address}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.address?.message}
                                    </div>
                                </Box>   
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
                            <Box>
                            <TextField
                            select
                            label={
                            <>
                                Branch Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                            </>
                            }
                            variant="outlined"
                            {...register("branchName")}
                            defaultValue={editData.companyDetails.branchName}
                            error={!!errors.branchName}
                            fullWidth
                            margin="normal"
                            SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                style: { maxHeight: 200 },
                                },
                            },
                            }}
                            >
                            {branch?.map((branchName, index) => (
                            <MenuItem key={index} value={branchName}>
                                {branchName}
                            </MenuItem>
                            ))}
                            </TextField>

                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                            {errors.branchName?.message}
                            </div>
                                </Box>
                                <Box>
                                <TextField
                                  InputLabelProps={{ shrink: true }}
                                   select
                                    label={
                                        <>
                                        Designation
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("designation")}
                                    error={!!errors.designation}
                                    fullWidth
                                    defaultValue={editData.companyDetails.designation}
                                    margin="normal"
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                            style: { maxHeight: 200 },
                                            },
                                        },
                                        }}
                                >
                                <MenuItem value ="Compounder">Compounder</MenuItem>
                                <MenuItem value ="Nurse">Nurse</MenuItem>
                                <MenuItem value ="Receptionist">Receptionist</MenuItem>
                                <MenuItem value ="Pharmacist">Pharmacist</MenuItem>
                                <MenuItem value ="Security Guard">Security Guard</MenuItem>
                                <MenuItem value ="Ward Boy">Ward Boy</MenuItem>
                                <MenuItem value ="Accountant">Accountant</MenuItem>
                                <MenuItem value ="Radiologist">Radiologist</MenuItem>
                                <MenuItem value ="HR Manager">HR Manager</MenuItem>
                                </TextField>
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.designation?.message}
                                    </div>
                                </Box>

                                <Box>
                                <TextField 
                                 InputLabelProps={{shrink:true}}
                                    type="date"
                                    label={
                                        <>
                                        Joining Date
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("joiningDate")}
                                    error={!!errors.joiningDate}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.joiningDate?.message}
                                    </div>
                                </Box>

                               </Grid>
                            <Grid item xs={6}>
                            <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Shift
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("shift")}
                                    error={!!errors.shift}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.shift?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Salary
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("salary")}
                                    error={!!errors.salary}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.salary?.message}
                                    </div>
                                </Box>
                               
                             </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>

            <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 3 }}>
            <Typography variant="h6" gutterBottom>
                Document Details
            </Typography>
            {[
                { label: "Highest Qualification Certificate", name: "highestQualificationCertificate", file: "certificate.pdf" },
                { label: "Resume", name: "resumeCertificate", file: "resume.pdf" },
                { label: "Aadhar Document", name: "aadharCard", file: "aadhar.pdf" },
                { label: "PAN Card Document", name: "panCard", file: "panCard.pdf" }
            ].map(({ label, name, file }) => (
                <Box key={name} marginBottom={2}>
                  <TextField 
                    InputLabelProps={{ shrink: true }}
                    type="file"
                    label={label}
                    variant="outlined"
                    {...register(name)}
                    error={!!errors[name]}
                    fullWidth
                    margin="normal"
                    inputProps={{ accept: "application/pdf" }} 
                  />
              
                  {existingDocuments?.[name] && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      View existing document:&nbsp;
                      <NavLink 
                        to={existingDocuments[name]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {file}
                      </NavLink>
                    </Typography>
                  )}
              
                  {errors[name]?.message && (
                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                      {errors[name].message}
                    </div>
                  )}
                </Box>
              ))}
            </Box>

            </Grid>

                <Grid item xs={6}>
                    <Box style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
                        <Typography variant="h6" gutterBottom>
                            Bank Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Account Holder Name
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("accountHolderName")}
                                    error={!!errors.accountHolderName}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.accountHolderName?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Account Number
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("accountNumber")}
                                    error={!!errors.accountNumber}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.accountNumber?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Bank Name
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("bankName")}
                                    error={!!errors.bankName}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.bankName?.message}
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                            <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        IFSC Code
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("ifscCode")}
                                    error={!!errors.ifscCode}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.ifscCode?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                       Bank Branch
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("branch")}
                                    error={!!errors.branch}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.branch?.message}
                                    </div>
                                </Box>
                                <Box>
                                <TextField
                                 InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={
                                        <>
                                        Branch Location
                                        </>
                                    }
                                    variant="outlined"
                                    {...register("branchLocation")}
                                    error={!!errors.branchLocation}
                                    fullWidth
                                    margin="normal"
                                />
                                   <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                    {errors.branchLocation?.message}
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2, width:"100%" }}>
                <Button onClick={handleCancel} className="secondary_button">
                  Cancel
                </Button>
                <Button type="submit" className="primary_button">

                 {loading ? (
                <>
                 <CircularProgress size={18} 
                 style={{ marginRight: 8, color: "#fff" }} />
                 Submitting
                </>
                 ) : (
               "Submit"
               )}

             </Button>
             </Box>
            </Grid>
            </form>
            </Box>
 }
        </>
    );
};

export default EditStaff;

