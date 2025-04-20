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
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  departmentName: yup.string().required("Department Name is required"),
  specialization: yup.array().min(1, "Select at least one specialization"),
  description: yup.string().required("Description is required"),
  departmentHead: yup.string().required("Department Head is required"),
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

// Sample department heads (replace with actual API data if needed)
const departmentHeads = [
  "Dr. Anita Sharma",
  "Dr. Vikram Singh",
  "Dr. Priya Das",
  "Dr. Rohan Mehta",
  "Dr. Neha Kapoor"
];

const EditDepartment = ({ handleUpdate, editData, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get("token");
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
    resolver: yupResolver(schema),
  });

  const specializationValue = watch("specialization");

  useEffect(() => {
    if (editData) {
      const deptNameNormalized = Object.keys(departmentSpecializations).find(
        (key) => key.toUpperCase() === editData.departmentName?.toUpperCase()
      );

      reset({
        departmentHead: editData.departmentHead || "",
        specialization: editData.specialization || [],
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
    formdata.append("description", data.description);
    formdata.append("departmentHead", data.departmentHead);
    data.specialization.forEach((spec, index) => {
      formdata.append(`specialization[${index}]`, spec);
    });

    fetch(`${Base_url}/department/${editData._id}`, {
      method: "PATCH",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.status === "success") {
          toast.success("Department updated successfully!");
          handleUpdate(true);
          handleClose();
          reset();
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Something went wrong!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={isSmScreen ? 12 : 6}>
          <FormControl fullWidth margin="normal" error={!!errors.departmentName}>
            <InputLabel id="departmentName-label">Department Name *</InputLabel>
            <Select
              labelId="departmentName-label"
              value={selectedDepartment}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDepartment(value);
                setValue("departmentName", value);
                setValue("specialization", []);
              }}
              
              MenuProps={{PaperProps:{style:{maxHeight:200,
                overflowY:"auto",
              },
            },
          }}
            >
              {Object.keys(departmentSpecializations).map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.departmentName?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6}>
          <FormControl fullWidth margin="normal" error={!!errors.specialization}>
            <InputLabel id="specialization-label">Specialization *</InputLabel>
            <Select
              labelId="specialization-label"
              multiple
              value={Array.isArray(specializationValue) ? specializationValue : []}
              onChange={(e) => setValue("specialization", e.target.value)}
              input={<OutlinedInput label="Specialization" />}
              renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : ""}
            >
              {(departmentSpecializations[selectedDepartment] || []).map((spec) => (
                <MenuItem key={spec} value={spec}>
                  <Checkbox checked={Array.isArray(specializationValue) && specializationValue.includes(spec)} />
                  <ListItemText primary={spec} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.specialization?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6}>
          <TextField
            label="Description *"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6}>
          <FormControl fullWidth margin="normal" error={!!errors.departmentHead}>
            <InputLabel id="departmentHead-label">Department Head *</InputLabel>
            <Select
              labelId="departmentHead-label"
              defaultValue=""
              {...register("departmentHead")}
              onChange={(e) => setValue("departmentHead", e.target.value)}
              value={watch("departmentHead") || ""}
            >
              {departmentHeads.map((head) => (
                <MenuItem key={head} value={head}>
                  {head}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.departmentHead?.message}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button onClick={handleClose} className="secondary_button">
          Cancel
        </Button>
        <Button type="submit" className="primary_button">
          {loading ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1, color: "#fff" }} /> Submitting
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