import React, {useEffect,useState} from "react"
import {
    TextField,
    Grid,
    useMediaQuery,
    Button,
    Box,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    FormControl,
  } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


  const schema = yup.object().shape({
    labReport: yup.mixed(),
    nextFollowUp: yup.string(),
    status: yup.string()
    
  });

const EditPatientsRecords =({handleCreate, editData, handleClose})=>
{
  const isSmScreen = useMediaQuery("(max-width:768px)");

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
  
     useEffect(() => {
        if (editData) {
          reset({
            labReport: editData.labReport || "",
            nextFollowUp: editData.nextFollowUp || "",
           status: editData.patient.status || "",
          });
        }
      }, [editData, reset]);
    

  
  
    const onSubmit = (data) => {
    
           setLoading(true)
           console.log(data);
  
          const formdata = new FormData();
          formdata.append("labReport", data.labReport[0]);
          formdata.append("nextFollowUp", data.nextFollowUp);
          formdata.append("mobileNo", editData.mobileNo);
          formdata.append("status", data.status);
         
      
          const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`, 
             },
          };
      
          fetch(`${Base_url}/patientsrecords/${editData._id}`, requestOptions)
            .then((response) => response.text())
      
            .then((result) => {
      
              const res = JSON.parse(result)
      
              if(res.status==="success")
              {
                setLoading(false)
               
                toast.success(" Patient Record Updated Successfully!")
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
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              label={
                <>
                  Lab Report 
                </>
              }
              variant="outlined"
              {...register("labReport")}
              error={!!errors.labReport}
              fullWidth
              margin="normal"
              inputProps={{ accept: "application/pdf" }} 
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.labReport?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              label={
                <>
                  Next Follow Up 
                </>
              }
              variant="outlined"
              {...register("nextFollowUp")}
              error={!!errors.nextFollowUp}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.nextFollowUp?.message}
            </div>
          </Grid>

         
           </Grid>
                   
                           < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
                                   <FormControl fullWidth margin="normal" error={!!errors.Status}>
                                       <InputLabel id="gender-label">
                                         Status
                                       </InputLabel>
                                       <Select
                                         labelId="status-label"
                                         id="status"
                                         label="status"
                                         defaultValue=""
                                         {...register("status")}
                                       >
                                         <MenuItem value="Under Observation">Under Observation</MenuItem>
                                         <MenuItem value="Under Treatment">Under Treatment</MenuItem>
                                         <MenuItem value="Recovered">Recovered</MenuItem>
                                       </Select>
                                       <FormHelperText>{errors.status?.message}</FormHelperText>
                                     </FormControl>
                                     </Grid>
          

      

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
          <Button onClick={handleClose} className="secondary_button">
            Cancel
          </Button>
          <Button type="submit" className="primary_button">
   {loading ? ( <>
          <CircularProgress
           size={18}
           style={{ marginRight: 8, color: "#fff" }}
          /> 
            Updating
          </> 
          )   : "Update"}
            

          </Button>
        </Box>
      </form>

        </>
     )
}

export default EditPatientsRecords;

