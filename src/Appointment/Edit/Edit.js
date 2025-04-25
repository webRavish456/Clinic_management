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
    doctors: ["Dr. A. Sharma", "Dr. P. Verma"],
  },
  Gynecology: {
    specialization: ["Female reproductive health", "Pregnancy", "Menstruation", "Menopause", "Fertility"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  Neurology: {
    specialization: ["Brain and Nervous system disorders", "Epilepsy", "Parkinson’s", "Stroke"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  Pediatrics: {
    specialization: ["Child Health", "Vaccinations", "Growth disorders", "Pediatric infections"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  Orthopedics: {
    specialization: ["Bones", "Joints", "Fractures", "Arthritis", "Spinal Problems", "Sports injuries"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  ENT: {
    specialization: ["Hearing issues", "Sinus Problems", "Throat infections", "Tonsillitis"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  GeneralMedicine: {
    specialization: ["Primary care", "Diabetes", "Hypertension", "Infections", "Routine checkups"],
    doctors: ["Dr. N. Patel", "Dr. R. Mehta"],
  },
  Dermatology: {
    specialization: ["Skin Specialist"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Psychiatry: {
    specialization: ["Mental health", "Depression", "Anxiety", "Bipolar disorder", "Schizophrenia"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Oncology: {
    specialization: ["Cancer treatment", "Tumor management"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Urology: {
    specialization: ["Kidney", "Bladder", "Prostate", "Urinary infections", "Male reproductive health"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Gastroenterology: {
    specialization: ["Digestive system", "Liver disease", "Acid reflux", "IBS", "Colonoscopy"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Nephrology: {
    specialization: ["Kidney health", "Dialysis", "Chronic kidney disease", "kidney transplants"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Pulmonology: {
    specialization: ["Lungs and respiratory system", "Asthma", "COPD", "Pneumonia", "Sleep apnea"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
  Endocrinology: {
    specialization: ["Hormonal disorders", "Diabetes", "Thyroid", "PCOS", "Adrenal issues"],
    doctors: ["Dr. K. Singh", "Dr. S. Desai"],
  },
};

const visitTypes = ["New Patient", "Follow-up"];
const gender = ["Male", "Female", "Other"];
const appointmentStatuses = ["Scheduled", "Completed", "Cancelled"];

const EditAppointment = ({ handleUpdate, editData, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get("token");
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
    },
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

  useEffect(() => {
    if (editData) {
      reset({
        patientName: editData.patientName || "",
        treatment: editData.treatment || "",
        mobileNo: editData.mobileNo || "",
        emailId: editData.emailId || "",
        gender: editData.gender || "",
        department: editData.department || "",
        specialization: editData.specialization || [],
        doctorAssigned: editData.doctorAssigned || "",
        appointmentDate: editData.appointmentDate || "",
        appointmentStatus: editData.appointmentStatus || "",
        visitType: editData.visitType || "",
      });

      if (editData.department) {
        const dept = departmentData[editData.department];
        setSpecializationOptions(dept?.specialization || []);
        setDoctorList(dept?.doctors || []);
      }
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
    formdata.append("doctorAssigned", data.doctorAssigned);
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
        {/* Patient Name */}
        <Grid item xs={12} sm={6}>
          <TextField
           label={
            <>
             Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
           }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("patientName")}
            error={!!errors.patientName}
            helperText={errors.patientName?.message}
          />
        </Grid>

        {/* Treatment */}
        <Grid item xs={12} sm={6}>
          <TextField
          label={
            <>
            Treatment <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
           }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("treatment")}
            error={!!errors.treatment}
            helperText={errors.treatment?.message}
          />
        </Grid>

        {/* Mobile */}
        <Grid item xs={12} sm={6}>
          <TextField
           label={
            <>
           Mobile No.<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
           }
      
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("mobileNo")}
            error={!!errors.mobileNo}
            helperText={errors.mobileNo?.message}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
           label={
            <>
           Email Id<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
           }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("emailId")}
            error={!!errors.emailId}
            helperText={errors.emailId?.message}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12}>
  <FormControl component="fieldset" error={!!errors.gender} margin="normal">
    <FormLabel component="legend">Gender<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></FormLabel>
    <RadioGroup row>
      {["Male", "Female", "Other"].map((value) => (
        <FormControlLabel
          key={value}
          value={value}
          control={
            <Radio
              {...register("gender", { required: "Gender is required" })}
              checked={watch("gender") === value}
              onChange={() => setValue("gender", value)}
            />
          }
          label={value}
        />
      ))}
    </RadioGroup>
    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
      {errors.gender?.message}
    </div>
  </FormControl>
</Grid>

        {/* Department */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label={
              <>
             Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
             }
            fullWidth
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

        {/* Specialization */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.specialization}>
          <InputLabel>Specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
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
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem", marginTop: 4 }}>
              {errors.specialization?.message}
            </div>
          </FormControl>
        </Grid>

        {/* Assigned Doctor */}
        <Grid item xs={12} sm={6}>
          <TextField
          label={
            <>
          Assigned Doctor <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
           }
            select
            fullWidth
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

        {/* Date */}
        <Grid item xs={12} sm={6}>
          <TextField
           label={
            <>
      Appointment Date  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
           }
            type="date"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("appointmentDate")}
            error={!!errors.appointmentDate}
            helperText={errors.appointmentDate?.message}
          />
        </Grid>

        {/* Appointment Status */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label={
              <>
         Appointment Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
             } 
            fullWidth
            margin="normal"
            variant="outlined"
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

        {/* Visit Type */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label={
              <>
       Visit Type  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
             }
            fullWidth
            margin="normal"
            variant="outlined"
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

      {/* Submit & Cancel Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button onClick={handleClose} className="secondary_button">
          Cancel
        </Button>
        <Button type="submit" className="primary_button">
          {loading ? (
            <>
              <CircularProgress size={18} style={{ marginRight: 8, color: "#fff" }} />
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