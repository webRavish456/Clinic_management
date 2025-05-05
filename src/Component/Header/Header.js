import React, { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, useNavigate } from "react-router-dom";



const Header=()=>
{
  const location = useLocation();

  const navigate = useNavigate()

  const Profilephoto = JSON.parse(localStorage.getItem("profilePhoto")) || null

    const settings = ['My Profile',  'Logout'];

    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = (setting) => {
      setAnchorElUser(null);
      if (setting === "My Profile") {
        navigate("/profile");
      } else if (setting === "Logout") {
        
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
      }
    };

    
    const getHeadingFromPath = () => {
      const path = location.pathname;
  
      if (path.includes("patients/allpatients")) return "Patient";
      if (path.includes("patients/patientsrecords")) return "Patient Record";
      if (path.includes("/staff")) return "Staff";
      if (path.includes("/branch")) return "Branch";
      if (path.includes("finance/income")) return "Income";
      if (path.includes("/dashboard")) return "Dashboard";
      if (path.includes("/appointment")) return "Appointment";
      if (path.includes("finance/expense")) return "Expense";
      if (path.includes("/department")) return "Department";
      if (path.includes("/appointment")) return "Appointment";
      if (path.includes("doctor/all-doctor")) return "Doctor";
      if (path.includes("doctor/shift-management")) return "Shift";
      if (path.includes("laboratory/alllab")) return "Laboratory";
      if (path.includes("laboratory/labtest")) return "Lab Test";
      if (path.includes("/appointment")) return "Appointment";
      if (path.includes("createstaff")) return "Create Staff";
      if (path.includes("viewstaff")) return "View Staff Details";
      if (path.includes("editstaff")) return "Edit Staff Details";
      if (path.includes("createDoctor")) return "Create Doctor";
      if (path.includes("viewDoctor")) return "View Doctor Details";
      if (path.includes("editDoctor")) return "Edit Doctor Details";     
  
    };
  

    return (
        <>
        <AppBar position="static" style={{backgroundColor:"#ffffff", height:"60px"}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>

        <Typography variant="h6" sx={{ color: " #333" }}>
          {getHeadingFromPath()}
        </Typography>

        
          <Box sx={{ flexGrow: 0, padding:"10px 30px",display:'flex', justifyContent:"flex-end" }}>
             
        

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="profilePhoto" src={Profilephoto} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Toolbar>
    </AppBar>

        </>
    )
}

export default Header;