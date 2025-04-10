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
import {useLocation} from "react-router-dom"

const Header=()=>{
  const location = useLocation();
  

    const settings = ['My Profile',  'Logout'];


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const getHeadingFromPath = () => {
      const path = location.pathname;
  
      if (path.includes("/dashboard")) return "Dashboard";
      if (path.includes("/branch")) return "Branch";
      if (path.includes("/department")) return "Department";
      if (path.includes("/doctor")) return "Doctor";
      if (path.includes("/staff")) return "Staff";
      if (path.includes("/patient")) return "Patiemt";
      if (path.includes("/laboratory")) return "Laboratory";
      if (path.includes("/finance")) return "Finance";
    };

    return (
        <>
        <AppBar position="static" style={{backgroundColor:"#ffffff", height:"60px"}}>
        <Typography variant="h6" sx={{ color: "#333" }}>
          {getHeadingFromPath()}
        </Typography>
    
          <Box sx={{ flexGrow: 0, padding:"10px 30px",display:'flex', justifyContent:"flex-end" }}>
            
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Ravish" src="Ravish" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </AppBar>

        </>
    )
}

export default Header;