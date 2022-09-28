import React from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function GlobalNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cage Free Hub
        </Typography>
        <Button color="secondary">Login</Button>
      </Toolbar>
    </AppBar> 
  )
}

export default GlobalNavBar