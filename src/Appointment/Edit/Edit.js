import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  InputLabel,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  patientName: yup.string().required("Patient Name is required"),
  treatment: yup.string().required("Treatment is required"),
  mobileNo: yup.string().required("MobileNo is required"),
  emailId: yup.string().required("Email Id is required"),
  gender: yup.string().required("Gender is required"),
  department: yup.string().required("department is required"),
  specialization: yup.string().required("specialization is required"),
  doctorAssigned: yup.string().required("Assigned Doctor is required"),
  appointmentDate: yup.string().required("Appointment Date is required"),
  appointmentStatus: yup.string().required("Appointment Status is required"),
  visitType: yup.string().required("Visit Type is required"),
});



const visitTypes = ["New Patient", "Follow-up"];

const appointmentStatusData = ["Scheduled", "Completed", "Cancelled"];

const EditAppointment = ({ handleUpdate, editData, handleClose }) => {

  const isSmScreen = useMediaQuery("(max-width:768px)");

  const token = Cookies.get("token");
  const Base_url = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);


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
        patientName: editData.patientName || "",
        treatment: editData.treatment || "",
        mobileNo: editData.mobileNo || "",
        emailId: editData.emailId || "",
        gender: editData.gender || "",
        department: editData.department || "",
        specialization: editData.specialization || "",
        doctorAssigned: editData.doctorAssigned || "",
        appointmentDate: editData.appointmentDate ? new Date(editData.appointmentDate).toISOString().split("T")[0] : "",
        appointmentStatus: editData.appointmentStatus || "",
        visitType: editData.visitType || "",
      });
    }
  }, [editData, reset]);

  const onSubmit = (data) => {

    setLoading(true);
    const formdata = new FormData();
    formdata.append("patientName", data.patientName);
    formdata.append("treatment", data.treatment);
    formdata.append("mobileNo", data.mobileNo);
    formdata.append("emailId", data.emailId);
    formdata.append("gender", data.gender);
    formdata.append("appointmentDate", data.appointmentDate);
    formdata.append("appointmentStatus", data.appointmentStatus);
    formdata.append("visitType", data.visitType);

    fetch(`${Base_url}/appointment/${editData._id}`, {
      method: "PATCH",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          toast.success("Appointment updated successfully!");
          handleUpdate(true);
          handleClose();
          reset();
        } else {
          toast.error(result.message || "Update failed.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error.");
        setLoading(false);
      });
  };

  return (


    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
         label={
          <>
         Patient Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
          </>
         }
          fullWidth
          {...register("patientName")}
          error={!!errors.patientName}
          helperText={errors.patientName?.message}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
     label={
      <>
     Treatment <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
      </>
     }
          fullWidth
          {...register("treatment")}
          error={!!errors.treatment}
          helperText={errors.treatment?.message}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
         label={
          <>
         Mobile No.<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
          </>
         }
          fullWidth
          {...register("mobileNo")}
          error={!!errors.mobileNo}
          helperText={errors.mobileNo?.message}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
              <TextField
              label={
                <>
              Email Id<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
                fullWidth
                {...register("emailId")}
                error={!!errors.emailId}
                helperText={errors.emailId?.message}
              />
            </Grid>

          

        <FormControl component="fieldset" fullWidth margin="normal" error={!!errors.gender}>
          <FormLabel component="legend" sx={{ marginLeft: 2 }}>Gender <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
          </FormLabel>
          <RadioGroup row defaultValue={editData.gender}>
            <FormControlLabel
              value="Male"
              control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
              label="Female"
            />
            <FormControlLabel
              value="Other"
              control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
              label="Other"
            />
          </RadioGroup>
          <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
            {errors.gender?.message}
          </div>
        </FormControl>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                        
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: true }}
                        label={
                            <>
                            Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                            </>
                        }
                        defaultValue={editData.department}
                        variant="outlined"
                        error={!!errors.department}
                        fullWidth
                        margin="normal"
                        {...register("department")}
                    
                        >
                      
                        </TextField>
            
            
                                <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.department?.message}
                                </div>
            
                                </Grid>
            
                            <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            
                             <TextField
                                InputLabelProps={{shrink:true}}
                                InputProps={{ readOnly: true }}
                                label={
                                    <>
                                    Specialization
                                    </>
                                }
                                defaultValue={editData.specialization}
                                variant="outlined"
                                    fullWidth
                                    margin="normal"
                                {...register("specialization")}
            
                         
                                error={!!errors.specialization}
                                
                                SelectProps={{
                                    MenuProps: {
                                    PaperProps: {
                                        style: { maxHeight: 200 },
                                    },
                                    },
                                }}
                                >
                            
            
                                    </TextField>
                                    
                                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                        {errors.specialization?.message}
                                        </div>
                                </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
                        InputLabelProps={{shrink:true}}
                        InputProps={{ readOnly: true }}
                          label={
                              <>
                          Assigned Doctor <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                              </>
                          }
                          variant="outlined"
                              fullWidth
                              margin="normal"
                          {...register("doctorAssigned")}
                          error={!!errors.doctorAssigned}
                          sx={{m:"0px"}}
                          >
                        
                          </TextField>
                          
                          <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                              {errors.doctorAssigned?.message}
                              </div>

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label={
                  <>
                Appointment Date<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                  </>
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register("appointmentDate")}
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label={
                  <>
                Appointment Status<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                  </>
                }
                fullWidth
                defaultValue={editData.appointmentStatus}
                {...register("appointmentStatus")}
                error={!!errors.appointmentStatus}
                helperText={errors.appointmentStatus?.message}
              >
                {appointmentStatusData.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              select
                label={
                  <>
                Visit Type<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                  </>
                }
                fullWidth
                defaultValue={editData.visitType}
                {...register("visitType")}
                error={!!errors.visitType}
                helperText={errors.visitType?.message}
              >
                {visitTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            </Grid>


          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button onClick={handleClose} className="secondary_button">
              Cancel
            </Button>
            <Button type="submit" className="primary_button">
              {loading ? (
                <>
                  <CircularProgress size={18} sx={{ mr: 1, color: "#fff" }} />
                  Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </form>
  );
};

export default EditAppointment;