import React , { useEffect, useState } from "react";
import CreateProfile from "./Create/Create";

import {
  Card,
  CardContent,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Grid,
  Avatar,
  FormControl,
  FormLabel
  
} from "@mui/material";
import Cookies from "js-cookie";
import EditProfile from "./Edit/Edit";
import CommonDialog from "../Component/CommonDialog/CommonDialog";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



const schema = yup.object().shape({

  profilePhoto: yup.mixed(),
  mobileNo: yup.string(),
  email: yup.string(),
  address: yup.string(),
  dob: yup.string(),
  name: yup.string(),
  gender: yup.string(),
});


const Profile = () => {

  const {
    register,
    reset,
  } = useForm({ 
    resolver: yupResolver(schema),
 
});

   const profile = JSON.parse(localStorage.getItem("profileId")) || null
  
  const [editMode, setEditMode] = useState(profile?true:false);

  const [gender, setGender]=useState([])

  const [openData, setOpenData] =useState(false)

  const [editShow, setEditShow] =useState(false)

  const [editData, setEditData] = useState(null);

  const [loading, setLoading] = useState(true)

  const [formData, setformData] =useState([])



  const handleClose=()=>
  {
     setOpenData(false);
     setEditShow(false);
  }

  const token = Cookies.get("token");
  const Base_url = process.env.REACT_APP_BASE_URL;


  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  useEffect(() => {

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${Base_url}/profile/${profile}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.text();
        const res = JSON.parse(result);
  
        if (res.status === "success") {

          setformData(res.data)
          setGender(res.data.gender)
          setEditData(res.data)
          setEditMode(true)

          localStorage.setItem("profilePhoto", JSON.stringify(res.data.profilePhoto))

          reset({
            name: res.data.name,
            gender: res.data.gender,
            dob: res.data.dob ? new Date(res.data.dob).toISOString().split("T")[0] : "",
            mobileNo: res.data.mobileNo,
            email: res.data.email,
            address: res.data.address,
            });        
        }

         res.status==="error" && localStorage.clear()

        setLoading(false);

      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };
  
    if (loading) {
      fetchProfileData();
    }
  }, [loading]);


  const handleCreateProfile = (e) => {

    setOpenData(true);
  }

  const handleUpdate = (data) => {
    setLoading(data)
  };

  const handleCreate =  (data) => {
     setLoading(data)
  };


const handleEditProfile = ()=>
{
    setEditShow(true)
}

  return (
     
    <>
    {!loading && <>
    <ToastContainer/>
    <Box className="container overflow">

      <Card sx={{ mb: 4}}>
        <CardContent>
      <Grid container spacing={2} alignItems="center">
      
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ width: 80, height: 80, mr: 2, background:"#d2d2d2", p:"4px" }} src={formData.profilePhoto}/>
            <Box className="profile_active">
              <Typography fontWeight="bold">Super Admin</Typography>
              <Button
              variant="contained"
              size="small"
              sx={{
              borderRadius: '20px',         
              textTransform: 'none',        
              fontSize: '12px',
              padding: '4px 12px',
              minWidth: 'auto',             
              boxShadow: 'none',            
        }}
        color="primary"
      >
        Active
      </Button>

            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography color="textSecondary" fontWeight="bold">
              ☎ Mobile No.: <span style={{fontSize:"14px", color:"#000"}}>{formData.mobileNo}</span>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="textSecondary" fontWeight="bold">
                📅 Email Id: <span style={{fontSize:"14px", color:"#000"}}>{formData.email}</span>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="textSecondary" fontWeight="bold">
              📍Address: <span style={{fontSize:"14px", color:"#000"}}>{formData.address}</span>
              </Typography>
            </Grid> 

            <Grid item xs={12} sm={6}>
              <Typography color="textSecondary" fontWeight="bold">
              📠 Date of Birth: <span style={{fontSize:"14px", color:"#000"}}>{ formData.dob ? new Date(formData.dob).toLocaleDateString('en-IN', options):null}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>


        </CardContent>
      </Card>


        <Card>
          <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">Personal Details:</Typography>
          </Box>
            <Box display="flex" gap={2}>
            {editMode ? 
            <Button variant="contained" 
              className="primary_button" 
              size="small" 
              sx={{
                       
                textTransform: 'none',        
                fontSize: '12px',
                padding: '4px 12px',
               }}
              onClick={handleEditProfile}>
               Edit
              </Button>
              : <Button variant="contained" 
              className="primary_button" 
              size="small" 
              sx={{
                       
                textTransform: 'none',        
                fontSize: '12px',
                padding: '4px 12px',
               }}
              onClick={handleCreateProfile}>
              Create
              </Button>}
             

            </Box>
          </Box>
          <TextField
          InputLabelProps={{ shrink:true}}
          type="text"
          label={
            <>
              Full name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
          }
          variant="outlined"
          {...register("name")}
      
          fullWidth
          margin="normal"
        />

           <FormControl component="fieldset" fullWidth margin="normal">
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
           
                    </FormControl>

       <TextField InputLabelProps={{shrink:true}}
                type="date"
                label={
                    <>
                    Date of Birth 
                    </>
                }
                variant="outlined"
                {...register("dob")}
             
                fullWidth
                margin="normal"
            />

           <TextField
                  type="text"
                  InputLabelProps={{ shrink:true}}
                  label={
                    <>
                      Mobile No <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                    </>
                  }
                  variant="outlined"
                  {...register("mobileNo")}
                 
                  fullWidth
                  margin="normal"
                />

         <TextField
              type="text"
              InputLabelProps={{ shrink:true}}
              label={
                <>
                  Email Id <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("email")}
              fullWidth
              margin="normal"
            />


     <TextField
           type="text"
            InputLabelProps={{ shrink:true}}
          label={
            <>
               Address <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
          }
          variant="outlined"
          {...register("address")}
          fullWidth
          margin="normal"
        />
           
          </CardContent>
        </Card>
     

        <CommonDialog
          open={openData ||  editShow }
          onClose={handleClose}
          dialogTitle={
            openData
              ? "Create Profile"
              : editShow
              ? "Edit Profile"
              : ""
          }
          dialogContent={
            openData ? (
              <CreateProfile handleCreate={handleCreate}  handleClose={handleClose} />
            ) : editShow ? (
              <EditProfile
                editData={editData}
                handleUpdate={handleUpdate}
                handleClose={handleClose}
              />
            ) : null
          }
        />
    </Box>
    </>
}
    </>
  );
};


export default Profile;