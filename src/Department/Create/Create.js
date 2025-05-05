import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Select from "react-select";

const schema = yup.object().shape({
  departmentName: yup.string().required("Department Name is required"),
  specialization: yup
    .array()
    .min(1, "Select at least one specialization")
    .required("Specialization is required"),
  description: yup.string().required("Description is required"),
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
  Nephrology: ["Kidney health", "Dialysis", "Chronic kidney disease", "Kidney transplants"],
  Pulmonology: ["Lungs and respiratory system", "Asthma", "COPD", "Pneumonia", "Sleep apnea"],
  Endocrinology: ["Hormonal disorders", "Diabetes", "Thyroid", "PCOS", "Adrenal issues"],
};

const CreateDepartment = ({ handleCreate, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get("token");
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [specialization, setSpecialization] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedSpecs = watch("specialization") || [];

  const onDepartmentChange = (e) => {
    const selected = e.target.value;
    setSelectedDepartment(selected);
    const specs = departmentSpecializations[selected] || [];
    setSpecialization(specs);
    setValue("departmentName", selected, { shouldValidate: true });
    setValue("specialization", []); // Clear previous selection
  };

  const onSubmit = (data) => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append("departmentName", data.departmentName);
    formdata.append("description", data.description);
    data.specialization.forEach((spec, i) =>
      formdata.append(`specialization[${i}]`, spec)
    );

    fetch(`${Base_url}/department`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Department created successfully!");
          handleCreate(true);
          reset();
          setSpecialization([]);
        } else {
          toast.error(res.message || "Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Department */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label={
              <>
                Department <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            error={!!errors.departmentName}
            {...register("departmentName")}
            onChange={onDepartmentChange}
            InputLabelProps={{ shrink: true }}
          >
            {Object.keys(departmentSpecializations).map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
          <FormHelperText error>{errors.departmentName?.message}</FormHelperText>
        </Grid>

        {/* Specialization */}
        <Grid item xs={12} md={6}>
          <InputLabel shrink>
            Specialization <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Select
            isMulti
            name="specialization"
            options={specialization.map((spec) => ({
              label: spec,
              value: spec,
            }))}
            value={selectedSpecs.map((spec) => ({
              label: spec,
              value: spec,
            }))}
            onChange={(selectedOptions) => {
              const values = selectedOptions.map((opt) => opt.value);
              setValue("specialization", values, { shouldValidate: true });
            }}
            className="react-select-container"
            classNamePrefix="select"
          />
          <FormHelperText error>{errors.specialization?.message}</FormHelperText>
        </Grid>

        {/* Description */}
        <Grid item xs={12} md={6}>
          <TextField
            label={
              <>
                Description <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            InputLabelProps={{ shrink: true }}
          />
          <FormHelperText error>{errors.description?.message}</FormHelperText>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button onClick={handleClose} className="secondary_button">
          Cancel
        </Button>
        <Button type="submit" className="primary_button" disabled={loading}>
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

export default CreateDepartment;
