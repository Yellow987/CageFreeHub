import React from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { mdiCommentOutline } from '@mui/icons-material';
const styles = {
  betaBox : {
    m:'8px', 
    px:'4px', 
    borderRadius: '2px'
  }
}

function GlobalNavBar() {
  return (
    <AppBar color="secondary" elevation={0} position="static">
      <Toolbar>
        <Typography color={grey[400]} sx={{ fontWeight: 'bold' }} variant="h6" component="div">
          Cage Free Hub
        </Typography>
        <Box bgcolor='primary.main' sx={{ ...styles.betaBox }}>
          <Typography color="common.white" variant="h6" component="div" sx={{ fontSize: 12 }}>
            Beta
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}/>
        <Button variant="outlined" style={{backgroundColor:'#EFFAF9', color:'#3FAB94', marginRight:'40px', border:'0'}}><mdiCommentOutline style={{color:'#3FAB94'}}/>Support</Button>
        <Button variant="outlined">Login</Button>
      </Toolbar>
    </AppBar> 
  )
}

export default GlobalNavBar