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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const schema = yup.object().shape({
  patientName: yup.string().required("Patient Name is required"),
  treatment: yup.string().required("Treatment is required"),
  mobileNo: yup.string().required("Mobile No. is required"),
  emailId: yup.string().required("Email Id is required"),
  gender: yup.string().required("Gender is required"),
  department: yup.string().required("Department is required"),
  specialization: yup.string().required("specialization is required"),
  doctorAssigned: yup.string().required("Assigned Doctor is required"),
  appointmentDate: yup.string().required("Appointment Date is required"),
  appointmentStatus: yup.string().required("Appointment Status is required"),
  visitType: yup.string().required("Visit Type is required"),
});



const visitTypes = ["New Patient", "Follow-up"];
const appointmentStatuses = ["Scheduled", "Completed", "Cancelled"];

const CreateAppointment = ({ handleCreate, handleClose }) => {



  const token = Cookies.get('token');

  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);

  const [department, setDepartment] =useState([])

  const [doctor, setDoctor] = useState([])

  const [availiableDoctor, setAvailableDoctor] = useState([])

  const [specialization, setSpecialization] = useState([])

  const [loadingData, setLoadingData] = useState(true)


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
 
  });



  useEffect(() => {
    
  
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(`${Base_url}/department`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.text();
        const res = JSON.parse(result);
  
        const formattedDepartment = res.data.map((item) => ({
            departmentName: item.departmentName,
            specialization: item.specialization,
          }));
          
          setDepartment(formattedDepartment);
          
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${Base_url}/alldoctor`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.text();
        const res = JSON.parse(result);
  
        const formattedDoctor = res.data.map((item) => ({
            doctorName: item.doctorName,
            specialization: item.companyDetails.specialization
          }));
          
          setDoctor(formattedDoctor);
          
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
  
    const fetchData = async () => {
      try {
        await Promise.all([fetchDepartmentData(), fetchDoctorData()]);
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingData(false);
      }
    };
  
    if (loadingData) {
      fetchData();
    }
  
  }, [loadingData]);


  
  const onDepartmentChange = (e) => {

    const selectedDept = e.target.value;
    const deptDetails = department.find((dept) => dept.departmentName === selectedDept);
  
    if (deptDetails) {
      setSpecialization(deptDetails.specialization);
    } else {
      setSpecialization([]);
    }
  };

  const onSpecializationChange = (e) => {

    const selectedSpecialization = e.target.value;
  
    const filteredDoctors = doctor.filter(
      (doc) => doc.specialization === selectedSpecialization
    );

    setAvailableDoctor(filteredDoctors); 
  };



  const onSubmit = (data) => {


    setLoading(true);
    const formdata = new FormData();
    formdata.append("patientName", data.patientName);
    formdata.append("treatment", data.treatment);
    formdata.append("mobileNo", data.mobileNo);
    formdata.append("emailId", data.emailId);
    formdata.append("gender", data.gender);
    formdata.append("department", data.department);
    formdata.append("specialization", data.specialization);
    formdata.append("doctorAssigned", data.doctorAssigned);
    formdata.append("appointmentDate", data.appointmentDate);
    formdata.append("appointmentStatus", data.appointmentStatus);
    formdata.append("visitType", data.visitType);

    fetch(`${Base_url}/appointment`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`},
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.status === "success") {
          toast.success("Appointment Created Successfully!");
          handleCreate(true);
          handleClose();
          reset();
        } else {
          toast.error(res.message || "Error creating appointment.");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong!");
        console.error(err);
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
      <RadioGroup row>
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

        <Grid item xs={12} sm={6}>
        <TextField
               InputLabelProps={{shrink:true}}
                  select
                  label={
                      <>
                      Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                      </>
                  }
                  variant="outlined"
                  error={!!errors.department}
                  fullWidth
                  margin="normal"
                  {...register("department")}
                  onChange={(e) => {
                      register("department").onChange(e);
                      onDepartmentChange(e);
                  }}

                  SelectProps={{
                      MenuProps: {
                      PaperProps: {
                          style: { maxHeight: 200 },
                      },
                      },
                  }}
                  sx={{m:"0px"}}
                  >
                  {department?.map((dept, index) => (
                      <MenuItem key={index} value={dept.departmentName}>
                      {dept.departmentName}
                      </MenuItem>
                  ))}
                  </TextField>

                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                    {errors.department?.message}
                    </div>

        </Grid>

        <Grid item xs={12} sm={6}>
              <TextField
                        InputLabelProps={{shrink:true}}
                          select
                          label={
                              <>
                              Specialization
                              </>
                          }
                            variant="outlined"
                              fullWidth
                              margin="normal"
                          {...register("specialization")}

                          onChange={(e) => {
                            register("specialization").onChange(e);
                            onSpecializationChange(e);
                        }}
                          error={!!errors.specialization}
                          
                          SelectProps={{
                              MenuProps: {
                              PaperProps: {
                                  style: { maxHeight: 200 },
                              },
                              },
                          }}
                          sx={{m:"0px"}}
                          >
                          {specialization?.map((spec, index) => (
                              <MenuItem key={index} value={spec}>
                              {spec}
                              </MenuItem>
                          ))}
                          </TextField>
                          
                          <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                              {errors.specialization?.message}
                              </div>

        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
                    InputLabelProps={{shrink:true}}
                      select
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
                    
                      SelectProps={{
                          MenuProps: {
                          PaperProps: {
                              style: { maxHeight: 200 },
                          },
                          },
                      }}
                      sx={{m:"0px"}}
                      >
                      {availiableDoctor?.map((doc, index) => (
                          <MenuItem key={index} value={doc.doctorName}>
                          {doc.doctorName}
                          </MenuItem>
                      ))}
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
            defaultValue=""
            {...register("appointmentStatus")}
            error={!!errors.appointmentStatus}
            helperText={errors.appointmentStatus?.message}
          >
            {appointmentStatuses.map((status) => (
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
            defaultValue=""
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

export default CreateAppointment;