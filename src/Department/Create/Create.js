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
  Menu,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  departmentName: yup.string().required("Department Name is required"),
  specialization: yup
    .array()
    .min(1, "Select at least one specialization")
    .required("Specialization is required"),
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
  Endocrinology: ["Hormonal disorders", "Diabetes", "Thyroid", "PCOS", "Adrenal issues"],
};

const departmentDescriptions = {
  Cardiology: "Specializes in diagnosing and treating heart-related conditions.",
  Gynecology: "Focuses on women's reproductive health and childbirth.",
  Neurology: "Deals with disorders of the nervous system.",
  Pediatrics: "Provides medical care for infants, children, and adolescents.",
  Orthopedics: "Specializes in bones, joints, ligaments, and muscles.",
  ENT: "Handles ear, nose, and throat related issues.",
  GeneralMedicine: "Covers general healthcare, chronic illness, and prevention.",
  Dermatology: "Treats skin, hair, and nail disorders.",
  Psychiatry: "Provides care for mental health and behavioral conditions.",
  Oncology: "Specializes in the diagnosis and treatment of cancer.",
  Urology: "Focuses on urinary tract system and male reproductive organs.",
  Gastroenterology: "Treats conditions related to the digestive system.",
  Nephrology: "Specializes in kidney care and dialysis.",
  Pulmonology: "Deals with lung and respiratory system disorders.",
  Endocrinology: "Treats hormonal imbalances and endocrine gland issues.",
};

const CreateDepartment = ({ handleCreate, handleClose }) => {

  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get("token");
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentHeads, setDepartmentHeads] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

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


  const onSubmit = (data) => {


    setLoading(true);

    console.log("department", data)

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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.departmentName}>
            <InputLabel>Department Name *</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDepartment(value);
                setValue("departmentName", value);
                setValue("specialization", []);
                setValue("description", departmentDescriptions[value] || "");
              }}
              label="Department Name"
              MenuProps={{
                PaperProps: {
                  style: { maxHeight: 200, overflowY: "auto" },
                },
              }}
            >
              {Object.keys(departmentSpecializations).map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.departmentName?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={!!errors.specialization}>
            <InputLabel>Specialization *</InputLabel>
            <OutlinedInput
              value={selectedSpecs.join(", ")}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              readOnly
              label="Specialization"
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{ style: { maxHeight: 300, width: 250 } }}
            >
              {(departmentSpecializations[selectedDepartment] || []).map((spec) => (
                <MenuItem
                  key={spec}
                  onClick={() => {
                    const updated = selectedSpecs.includes(spec)
                      ? selectedSpecs.filter((s) => s !== spec)
                      : [...selectedSpecs, spec];
                    setValue("specialization", updated, { shouldValidate: true });
                  }}
                >
                  <Checkbox checked={selectedSpecs.includes(spec)} />
                  <ListItemText primary={spec} />
                </MenuItem>
              ))}
              {selectedSpecs.length > 0 && (
                <MenuItem disableRipple>
                  <Button variant="contained" onClick={() => setAnchorEl(null)} fullWidth>
                    OK
                  </Button>
                </MenuItem>
              )}
            </Menu>
            <FormHelperText>{errors.specialization?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description *"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            value={watch("description") || ""}
            onChange={(e) => setValue("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
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

export default CreateDepartment;