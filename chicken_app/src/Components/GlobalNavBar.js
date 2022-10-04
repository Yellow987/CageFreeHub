import React from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import SupportPopup from './SupportPopup';
import { Link } from 'react-router-dom';

const styles = {
  betaBox : {
    m:'8px', 
    px:'4px', 
    borderRadius: '2px'
  }
}

function GlobalNavBar() {
  const [isNavSmall, setIsNavSmall] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setIsNavSmall(event.currentTarget);
  }


  return (
    <AppBar color="secondary" elevation={0} position="static">
      <Toolbar>
        <Typography component={Link} to="/" 
        color={grey[400]} sx={{ fontWeight: 'bold', textDecoration: "none" }} variant="h6">
          Cage Free Hub
        </Typography>
        <Box bgcolor='primary.main' sx={{ ...styles.betaBox }}>
          <Typography color="common.white" variant="h6" component="div" sx={{ fontSize: 12 }}>
            Beta
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}/>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button variant="outlined" 
              style={{
                backgroundColor:'#EFFAF9', 
                color:'#3FAB94', 
                marginRight:'40px', 
                border:'0'
              }} {...bindTrigger(popupState)}>
                Support
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <SupportPopup/>
              </Popover>
            </div>
          )}
        </PopupState>
        <Button variant="outlined" component={Link} to="/Login" >Login</Button>
      </Toolbar>
    </AppBar> 
  )
}

export default GlobalNavBar