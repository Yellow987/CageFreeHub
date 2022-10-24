import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, Box, List, ListItem, MenuItem, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import SupportPopup from './SupportPopup';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  betaBox : {
    m:'8px', 
    px:'4px', 
    borderRadius: '2px'
  }
}

function GlobalNavBar() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { t, i18n } = useTranslation(['navbar']);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [anchorElLoggedIn, setAnchorElLoggedIn] = useState(null)
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
  const [accordionIconIsClose, setAccordionIconIsClose] = useState(false)

  const languages = [
    {name:"English", symbol:"en"}, 
    {name:"Spanish", symbol:"ESP"}, 
    {name:"Indonesian", symbol:"indo"}
  ]
  const [currentLanguage, setCurrentLanguage] = React.useState("")

  useEffect(() => { 
    setCurrentLanguage("English")
  }, [])

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

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language.symbol);
    setCurrentLanguage(language.name)
  }

  const handleLoggedInMenu = (event) => {
    setAnchorElLoggedIn(event.currentTarget)
  }

  const handleCloseLoggedInMenu = (event) => {
    setAnchorElLoggedIn(null)
  }

  const handleEditProfile = (event) => {
    setAnchorElLoggedIn(null)
    //TODO
  }

  const handleLogout = (event) => {
    setAnchorElLoggedIn(null)
    logout()
  }

  function handleAccordion() {
    if (isAccordionExpanded) {
      setIsAccordionExpanded(false)
      setTimeout(() => {
        setAccordionIconIsClose(false)
    }, 100);
    } else {
      setIsAccordionExpanded(true)
      setAccordionIconIsClose(true)
    }
  }

  return (
    <>
      <Accordion expanded={isAccordionExpanded} elevation={0} sx={{ display:{ xs:'block', sm:'none'} }}>
        <AccordionSummary expandIcon={accordionIconIsClose ? <CloseIcon onClick={() => handleAccordion()} /> : <MenuIcon onClick={() => handleAccordion()} />} >
          <Typography color={grey[400]} sx={{ fontWeight: 'bold', textDecoration: "none" }} variant="h6">
            Cage Free Hub
          </Typography>
          <Box bgcolor='primary.main' sx={{ ...styles.betaBox }}>
            <Typography color="common.white" variant="h6" component="div" sx={{ fontSize: 12 }}>
              Beta
            </Typography>
          </Box>
        </AccordionSummary>
        <List>
          <ListItem button component={Link} to="/login" onClick={() => handleAccordion()} sx={{ display: currentUser ? 'none' : 'block' }}>
            <Typography variant='p_large' sx={{ margin:'auto' }}>Login</Typography>
          </ListItem>
          <Box sx={{ display: currentUser ? 'block' : 'none' }}>
            <ListItem button component={Link} to="/TODO" onClick={() => handleAccordion()}>
              <Typography variant='p_large' sx={{ margin:'auto' }}>Edit Profile</Typography>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {handleAccordion();setTimeout(() => {logout();navigate('/login')}, 100)}} >
              <Typography variant='p_large' sx={{ margin:'auto' }}>Logout</Typography>
            </ListItem>
          </Box>
          <Divider />
          <SupportPopup />
          <Divider />
        </List>
      </Accordion>
    <AppBar color="secondary" elevation={0} position="static" sx={{ display:{ xs:'none', sm:'block'} }}>
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
        <Box sx={{ display:{xs:'none', sm:'flex'}}} >
          <Box sx={{ marginRight:2}}>
            <PopupState variant="popover" >
              {(popupState) => (
                <div>
                  <Button variant="outlined" 
                  style={{
                    backgroundColor:'#EFFAF9', 
                    color:'#3FAB94',  
                    border:'0'
                  }} {...bindTrigger(popupState)}>
                    <HelpOutlineIcon fontSize='small' style={{ marginRight:6}}/>
                    {t('support')}
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
          <Box >
            <Button
              size="large"
              aria-controls="menu-language"
              aria-haspopup="true"
              onClick={handleOpenLanguageMenu} 
              color="inherit"
              sx={{ marginRight:2, color:'#788492' }}
            >
              <LanguageIcon fontSize='small' style={{ strokeWidth:'', marginRight:6 }}/>
              <Typography variant='p_default'>{currentLanguage}</Typography>
            </Button>
            <Menu 
              id="menu-language"
              anchorEl={anchorElLanguage}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElLanguage)}
              onClose={handleCloseLanguageMenu}>
                {(languages.filter((language) => language.name !== currentLanguage)).map((language) => (
                  <MenuItem key={language.name} onClick={() => handleChangeLanguage(language)}>
                    {language.name}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Button sx={{ display: currentUser ? 'none' : 'block' }} variant="outlined" component={Link} to="/login" >{t('login')}</Button>
          <Box sx={{ display: currentUser ? 'block' : 'none' }}>
            <IconButton
              aria-label="idk"
              aria-controls="logged-in-appbar"
              aria-haspopup="true"
              onClick={handleLoggedInMenu}
            >
              <AccountCircleIcon/>
            </IconButton>
            <Menu
              id="logged-in-appbar"
              anchorEl={anchorElLoggedIn}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElLoggedIn)}
              onClose={handleCloseLoggedInMenu}
            >
              <MenuItem onClick={handleEditProfile}>{t('editProfile')}</MenuItem>
              <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ display:{xs:'block', sm:'none'}}}>
          <IconButton
            size="large"
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}>
            <MenuItem component={Link} to="/Login" onClick={handleCloseNavMenu}>
              {t('login')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar> 
  </>
  )
}

export default GlobalNavBar