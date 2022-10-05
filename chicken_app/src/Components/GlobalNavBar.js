import React from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import SupportPopup from './SupportPopup';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const styles = {
  betaBox : {
    m:'8px', 
    px:'4px', 
    borderRadius: '2px'
  }
}

function GlobalNavBar() {
  const { t, i18n } = useTranslation(['navbar']);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);
  const [currentLanguage, setCurrentLanguage] = React.useState("")
  const languages = [{lang:"English", symbol:"en"}, {lang:"Spanish", symbol:"esp"}, {lang:"Indonesian", symbol:"indo"}]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const changeLanguage = lng => {          
    i18n.changeLanguage(lng);
  };

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
        <Box sx={{ display:{xs:'none', sm:'block'}, marginRight:2}}>
          <PopupState variant="popover" >
            {(popupState) => (
              <div>
                <Button variant="outlined" 
                style={{
                  backgroundColor:'#EFFAF9', 
                  color:'#3FAB94',  
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
        </Box>
        <Box sx={{ display:{xs:'none', sm:'block'}}}>
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-language"
            aria-haspopup="true"
            onClick={handleOpenLanguageMenu} 
            color="inherit"
          >
            english
          </Button>
          <Menu 
            id="menu-language"
            anchorEl={anchorElLanguage}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElLanguage)}
            onClose={handleCloseLanguageMenu}>
            <MenuItem  onClick={handleCloseLanguageMenu}>
              Spanish
            </MenuItem>
          </Menu>
        </Box>
        {/* <Button sx={{ display:{xs:'none', sm:'block'}, marginRight:2}} onClick={() => changeLanguage('en')}>{t('english')}</Button> */}
        <Button sx={{ display:{xs:'none', sm:'block'}}} variant="outlined" component={Link} to="/Login" >{t('login')}</Button>
        <Box sx={{ display:{xs:'block', sm:'none'}}}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu} 
            color="inherit"
          >
            <MenuIcon/>
          </IconButton>
          <Menu 
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}>
            <MenuItem component={Link} to="/Login" onClick={handleCloseNavMenu}>
              Login
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar> 
  )
}

export default GlobalNavBar