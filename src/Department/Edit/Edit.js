import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const schema = yup.object().shape({
  departmentName: yup.string().required("Department Name is required"),
  specialization: yup.string().required("Specialization is required"),
  description: yup.string().required("Description is required"),
  departmentHead: yup.string(),
});

const departmentSpecializations = {
  Cardiology: ["Heart Diseases", "Arrhythmia", "Hypertension", "Heart Failure", "Angioplasty"],
  Gynecology: ["Female reproductive health", "Pregnancy", "Menstruation", "Menopause", "Fertility"],
  Neurology: ["Brain and Nervous system disorders", "Epilepsy", "Parkinson’s", "Stroke"],
  Pediatrics: ["Child Health", "Vaccinations", "Growth disorders", "Pediatric infections"],
  Orthopedics: ["Bones", "Joints", "Fractures", "Arthritis", "Spinal Problems", "Sports injuries"],
  ENT: ["Hearing issues", "Sinus Problems", "Throat infections", "Tonsillitis"],
  GeneralMedicine: ["Primary care", "Diabetes", "Hypertension", "Infections", "Routine checkups"],
  Dermatology: ["Skin diseases", "Acne", "Eczema", "Psoriasis", "Cosmetic skin treatments"],
  Psychiatry: ["Mental health", "Depression", "Anxiety", "Bipolar disorder", "Schizophrenia"],
  Oncology: ["Cancer treatment", "Tumor management"],
  Urology: ["Kidney", "Bladder", "Prostate", "Urinary infections", "Male reproductive health"],
  Gastroenterology: ["Digestive system", "Liver disease", "Acid reflux", "IBS", "Colonoscopy"],
  Nephrology: ["Kidney health", "Dialysis", "Chronic kidney disease", "kidney transplants"],
  Pulmonology: ["Lungs and respiratory system", "Asthma", "COPD", "Pneumonia", "Sleep apnea"],
  Endocrinology: ["Hormonal disorders", "Diabetes", "Thyroid", "PCOS", "Adrenal issues"]
};

const EditDepartment = ({ handleUpdate, editData, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get('token');
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (editData) {
      const deptNameNormalized = Object.keys(departmentSpecializations).find(
        key => key.toUpperCase() === editData.departmentName?.toUpperCase()
      );
      reset({
        departmentHead: editData.departmentHead || "",
        specialization: editData.specialization || "",
        description: editData.description || "",
        departmentName: deptNameNormalized || "",
      });
      setSelectedDepartment(deptNameNormalized || "");
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    setLoading(true);
    const formdata = new FormData();

    formdata.append("departmentName", data.departmentName);
    formdata.append("specialization", data.specialization);
    formdata.append("description", data.description);
    formdata.append("departmentHead", data.departmentHead);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${Base_url}/department/${editData._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          setLoading(false);
          toast.success("Department updated successfully!");
          handleUpdate(true);
          handleClose();
          reset();
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
          <FormControl fullWidth margin="normal" error={!!errors.departmentName}>
            <InputLabel id="departmentName-label">
              Department Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </InputLabel>
            <Select
              labelId="departmentName-label"
              id="departmentName"
              label="Department Name"
              value={selectedDepartment}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDepartment(value);
                setValue("departmentName", value);
                setValue("specialization", ""); // Reset specialization
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {Object.keys(departmentSpecializations).map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept.replace(/_/g, " ")}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.departmentName?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
          <FormControl fullWidth margin="normal" error={!!errors.specialization}>
            <InputLabel id="specialization-label">
              Specialization<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </InputLabel>
            <Select
              labelId="specialization-label"
              id="specialization"
              label="Specialization"
              value={watch("specialization") || ""}
              onChange={(e) => setValue("specialization", e.target.value)}
            >
              {(departmentSpecializations[selectedDepartment] || []).map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.specialization?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
          <TextField
            label="Description *"
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
          <TextField
            label="Department Head *"
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            {...register("departmentHead")}
            error={!!errors.departmentHead}
            helperText={errors.departmentHead?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
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

export default EditDepartment;