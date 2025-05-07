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
  Cardiology:["Heart Diseases", "Arrhythmia", "Hypertension", "Heart Failure", "Angioplasty"],
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


const EditDepartment = ({ handleUpdate, editData, handleClose }) => {

  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get("token");
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [currentSpecs, setCurrentSpecs] = useState()
  
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

  useEffect(() => {
    if (editData) {
      reset({
        departmentHead: editData.departmentHead || "",
        specialization: editData.specialization || [],
        description: editData.description || "",
        departmentName: editData.departmentName || "",
      });

      setSelectedDepartment(editData.departmentName)
      // const deptKey = Object.keys(departmentSpecializations).find(
      //   (key) => key.toLowerCase() === editData.departmentName?.toLowerCase()
      // );
      // if (deptKey) {
      //   setCurrentSpecs(departmentSpecializations[deptKey]);
      // }
    }
  }, [editData, reset])


  const onSubmit = (data) => {


    setLoading(true);

    console.log("department", data)

    const formdata = new FormData();
    formdata.append("departmentName", data.departmentName);
    formdata.append("description", data.description);

    data.specialization.forEach((spec, i) =>
      formdata.append(`specialization[${i}]`, spec)
    );

    fetch(`${Base_url}/department/${editData._id}`, {
      method: "PATCH",
      headers: {
        Authorization:` Bearer ${token}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Department updated successfully!");
          handleUpdate(true);
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
      <Grid container columnSpacing={2}>

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
               
              }}
              label="Department Name"
             
     

              MenuProps={{PaperProps:{style:{maxHeight:200,
                overflowY:"auto",
              },
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
            <Select
              multiple
              value={watch("specialization") || []}
              onChange={(e) => setValue("specialization", e.target.value)}
              input={<OutlinedInput label="Specialization" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {(departmentSpecializations[selectedDepartment] || []).map((spec) => (
                <MenuItem key={spec} value={spec}>
                  <Checkbox checked={watch("specialization")?.includes(spec)} />
                  <ListItemText primary={spec} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.specialization?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} >
        <TextField
            label={
              <>
                Description <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            multiline
            {...register("description")}
            error={!!errors.description}
            InputLabelProps={{ shrink: true }}
          />
           <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
             {errors.description?.message}
             </div>
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

export default EditDepartment;


