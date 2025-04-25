import React, { useState } from "react";
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
  specialization: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one specialization")
    .required("Specialization is required"),
  doctorAssigned: yup.string().required("Assigned Doctor is required"),
  appointmentDate: yup.string().required("Appointment Date is required"),
  appointmentStatus: yup.string().required("Appointment Status is required"),
  visitType: yup.string().required("Visit Type is required"),
});

const departmentData = {
  Cardiology: {
    specialization: ["Heart Diseases", "Arrhythmia", "Hypertension", "Heart Failure", "Angioplasty"],
    doctors: ["Dr. Avi Sharma", "Dr. Pankaj Verma"],
  },
  Gynecology: {
    specialization: ["Female reproductive health", "Pregnancy", "Menstruation", "Menopause", "Fertility"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  Neurology: {
    specialization: ["Brain and Nervous system disorders", "Epilepsy", "Parkinson’s", "Stroke"],
    doctors: ["Dr. Nidhi Agarwal", "Dr. Rahul Sharma"],
  },
  Pediatrics: {
    specialization: ["Child Health", "Vaccinations", "Growth disorders", "Pediatric infections"],
    doctors: ["Dr. Nita Ambani", "Dr. Rounak Mehta"],
  },
  Orthopedics: {
    specialization: ["Bones", "Joints", "Fractures", "Arthritis", "Spinal Problems", "Sports injuries"],
    doctors: ["Dr. Nishant Patodi", "Dr. Amit Ghosh"],
  },
  ENT: {
    specialization: ["Hearing issues", "Sinus Problems", "Throat infections", "Tonsillitis"],
    doctors: ["Dr. Megha Banarjee", "Dr. Sunita kumari"],
  },
  GeneralMedicine: {
    specialization: ["Primary care", "Diabetes", "Hypertension", "Infections", "Routine checkups"],
    doctors: ["Dr. Riya Bhattacharjee", "Dr. R.k Rathore"],
  },
  Dermatology: {
    specialization: ["Skin Specialist"],
    doctors: ["Dr. Barnali Chattopadhya", "Dr.Bhumika Das"],
  },
  Psychiatry: {
    specialization: ["Mental health", "Depression", "Anxiety", "Bipolar disorder", "Schizophrenia"],
    doctors: ["Dr. Nil Das", "Dr. Madhabi Das"],
  },
  Oncology: {
    specialization: ["Cancer treatment", "Tumor management"],
    doctors: ["Dr. Susmita Sen", "Dr. Risa Khan"],
  },
  Urology: {
    specialization: ["Kidney", "Bladder", "Prostate", "Urinary infections", "Male reproductive health"],
    doctors: ["Dr. Zuhi Chawla", "Dr. Asit Modi"],
  },
  Gastroenterology: {
    specialization: ["Digestive system", "Liver disease", "Acid reflux", "IBS", "Colonoscopy"],
    doctors: ["Dr. Kamla Prasad", "Dr. Anil Khurana"],
  },
  Nephrology: {
    specialization: ["Kidney health", "Dialysis", "Chronic kidney disease", "kidney transplants"],
    doctors: ["Dr. Kajao Singh", "Dr. Rani Mukherjee"],
  },
  Pulmonology: {
    specialization: ["Lungs and respiratory system", "Asthma", "COPD", "Pneumonia", "Sleep apnea"],
    doctors: ["Dr. Moni Ghosh", "Dr. Shreya Sangiri"],
  },
  Endocrinology: {
    specialization: ["Hormonal disorders", "Diabetes", "Thyroid", "PCOS", "Adrenal issues"],
    doctors: ["Dr. Kiya Dey", "Dr. Asutosh Dey"],
  },
};

const visitTypes = ["New Patient", "Follow-up"];
const gender = ["Male", "Female", "Other"];
const appointmentStatuses = ["Scheduled", "Completed", "Cancelled"];

const CreateAppointment = ({ handleCreate, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get('token');
  const Base_url = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      specialization: [],
    }
  });

  const onDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    const deptDetails = departmentData[selectedDept];
    if (deptDetails) {
      setSpecializationOptions(deptDetails.specialization);
      setDoctorList(deptDetails.doctors);
      setValue("specialization", []);
      setValue("doctorAssigned", deptDetails.doctors[0]);
    } else {
      setSpecializationOptions([]);
      setDoctorList([]);
      setValue("specialization", []);
      setValue("doctorAssigned", "");
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("patientName", data.patientName);
    formdata.append("treatment", data.treatment);
    formdata.append("mobileNo", data.mobileNo);
    formdata.append("emailId", data.emailId);
    formdata.append("gender", data.gender);
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
            select
            label={
              <>
             Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
             }
            fullWidth
            defaultValue=""
            {...register("department")}
            onChange={(e) => {
              register("department").onChange(e);
              onDepartmentChange(e);
            }}
            error={!!errors.department}
            helperText={errors.department?.message}
            SelectProps={{
            MenuProps:{
              PaperProps:{
                style:{maxHeight:200,
                },
            },
          },
        }}
          >
            {Object.keys(departmentData).map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.specialization}>
            <InputLabel>Specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </InputLabel>
            <Select
              multiple
              value={watch("specialization")}
              onChange={(e) => setValue("specialization", e.target.value)}
              renderValue={(selected) => selected.join(", ")}
            >
              {specializationOptions.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
                
              ))}
            </Select>
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem", marginTop: "4px" }}>
              {errors.specialization?.message}
            </div>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label={
              <>
            Assigned Doctor<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
             }
            fullWidth
            defaultValue=""
            {...register("doctorAssigned")}
            error={!!errors.doctorAssigned}
            helperText={errors.doctorAssigned?.message}
          >
            {doctorList.map((doc) => (
              <MenuItem key={doc} value={doc}>
                {doc}
              </MenuItem>
            ))}
          </TextField>
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