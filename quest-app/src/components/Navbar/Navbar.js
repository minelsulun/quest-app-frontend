import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



function Navbar() {
  let userId = 5;
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="relative" z-index='1' sx={{ backgroundColor: 'pink' }} elevation={4}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"left"}} >
            <Link style={{ textDecoration: 'none',borderRadius:'4px',padding:'8px',backgroundColor:'white', color: 'black', flexGrow:"1" }} to="/">
              Home
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"right" }} >
            <Link style={{ textDecoration: 'none', color: 'inherit', flexGrow:"1" }} to={`/users/${userId}`}>
              User
            </Link>
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
