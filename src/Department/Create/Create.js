import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const departmentSpecializations = {
  cardiology: ["Heart Diseases", "Arrhythmia", "Hypertension", "Heart Failure", "Angioplasty"],
  gynecology: ["Female reproductive health", "Pregnancy", "Menstruation", "Menopause", "Fertility"],
  neurology: ["Brain and Nervous system disorders", "Epilepsy", "Parkinson’s", "Stroke"],
  pediatrics: ["Child Health", "Vaccinations", "Growth disorders", "Pediatric infections"],
  orthopedics: ["Bones", "Joints", "Fractures", "Arthritis", "Spinal Problems", "Sports injuries"],
  ENT: ["Hearing issues", "Sinus Problems", "Throat infections", "Tonsillitis"],
  General_Medicine: ["Primary care", "Diabetes", "Hypertension", "Infections", "Routine checkups"],
  dermatalogy: ["Skin diseases", "Acne", "Eczema", "Psoriasis", "Cosmetic skin treatments"],
  Psychiatry: ["Mental health", "Depression", "Anxiety", "Bipolar disorder", "Schizophrenia"],
  Oncology: ["Cancer treatment(chemotherapy, radiotherapy)", "Tumor management"],
  Urology: ["Kidney", "Bladder", "Prostate", "Urinary infections", "Male reproductive health"],
  Gastroenterology: ["Digestive system", "Liver disease", "Acid reflux", "IBS", "Colonoscopy"],
  Nephrology: ["Kidney health", "Dialysis", "Chronic kidney disease", "kidney transplants"],
  Pulmonology: ["Lungs and respiratory system", "Asthma", "COPD", "Pneumonia", "Sleep apnea"],
  Endocrinology: ["Hormonal disorders", "Diabetes", "Thyroid", "PCOS", "Adrenal issues"]
};

const schema = yup.object().shape({
  departmentName: yup.string().required("Department Name is required"),
  specialization: yup.string().required("Specialization is required"),
  description: yup.string().required("Description is required"),
  departmentHead: yup.string().required("Department Head is required"),
});

const CreateDepartment = ({ handleCreate, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get('token');
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState("cardiology");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      departmentName: "cardiology",
      specialization: "Heart Diseases"
    }
  });

  useEffect(() => {
    // Set default specialization when default department is selected
    setValue("specialization", departmentSpecializations["cardiology"][0]);
  }, [setValue]);

  const onSubmit = (data) => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append("departmentName", data.departmentName);
    formdata.append("specialization", data.specialization);
    formdata.append("description", data.description);
    formdata.append("departmentHead", data.departmentHead);

    fetch(`${Base_url}/department`, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization:` Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Department Created Successfully!");
          handleCreate(true);
          handleClose();
          reset();
        } else {
          toast.error(res.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <FormControl fullWidth margin="normal" error={!!errors.departmentName}>
              <InputLabel>Department Name *</InputLabel>
              <Select
                value={watch("departmentName") || ""}
                label="Department Name"
                {...register("departmentName")}
                onChange={(e) => {
                  const dept = e.target.value;
                  setValue("departmentName", dept);
                  setSelectedDept(dept);
                  const defaultSpec = departmentSpecializations[dept]?.[0] || "";
                  setValue("specialization", defaultSpec);
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
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.departmentName?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <FormControl fullWidth margin="normal" error={!!errors.specialization}>
              <InputLabel>Specialization *</InputLabel>
              <Select
                value={watch("specialization") || ""}
                label="Specialization"
                {...register("specialization")}
                disabled={!selectedDept}
              >
                {(departmentSpecializations[selectedDept] || []).map((spec) => (
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
              type="text"
              label="Description *"
              variant="outlined"
              {...register("description")}
              error={!!errors.description}
              fullWidth
              multiline
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.description?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <TextField
              type="text"
              label="Department Head *"
              variant="outlined"
              {...register("departmentHead")}
              error={!!errors.departmentHead}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.departmentHead?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="date"
              label="Date *"
              variant="outlined"
              {...register("date")}
              error={!!errors.date}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.date?.message}
            </div>
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
    </>
  );
};

export default CreateDepartment;