import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, Box, List, ListItem, MenuItem, Divider, Popover } from '@mui/material';
import { grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
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
import adminUid from '../AdminAccountsConfig';

const styles = {
  betaBox : {
    m:'8px', 
    px:'4px', 
    borderRadius: '2px'
  }
}

function GlobalNavBar() {
  const { currentUser, logout, currentUserInfo } = useAuth()
  const { t, i18n } = useTranslation(['navbar']);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [anchorElLoggedIn, setAnchorElLoggedIn] = useState(null)
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
  const [accordionIconIsClose, setAccordionIconIsClose] = useState(false)
  const [editProfileLink, setEditProfileLink] = useState('')
  const [supportPopupAnchorEl, setSupportPopupAnchorEl] = useState(null);
  const navigate = useNavigate()

  const languages = {
    en: "English",
    zh: "Chinese",
    fil: "Filipino",
    hi: "Hindi",
    id: "Indonesian",
    ja: "Japanese",
    ms: "Malay",
    th: "Thai",
    vi: "Vietnamese"
  }


  const [currentLanguage, setCurrentLanguage] = useState(languages[i18n.language])

  useEffect(() => {
    if (currentUserInfo) {
      setEditProfileLink(currentUserInfo.isSeller ? '/profile/basics' : '/buyer-setup')
    } else {
      setEditProfileLink('')
    }
  }, [currentUserInfo])

  const handleOpenNavMenu = (event) => {
    event.preventDefault()
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    event.preventDefault()
    setAnchorElNav(null);
  };

  const handleOpenLanguageMenu = (event) => {
    event.preventDefault()
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = (event) => {
    event.preventDefault()
    setAnchorElLanguage(null);
  };

  const handleChangeLanguage = (event, languageSymbol) => {
    i18n.changeLanguage(languageSymbol);
    setCurrentLanguage(languages[languageSymbol])
  }

  const handleLoggedInMenu = (event) => {
    event.preventDefault()
    setAnchorElLoggedIn(event.currentTarget)
  }

  const handleCloseLoggedInMenu = (event) => {
    event.preventDefault()
    setAnchorElLoggedIn(null)
  }

  const handleEditProfile = (event) => {
    event.preventDefault()
    setAnchorElLoggedIn(null)
    navigate(editProfileLink)
  }

  const handleLogout = (event) => {
    event.preventDefault()
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
    <AppBar color="secondary" elevation={0} position="sticky" sx={{display:{ xs:'flex', sm:'none'}}}>
      <Accordion expanded={isAccordionExpanded} elevation={0}>
        <AccordionSummary expandIcon={accordionIconIsClose ? <CloseIcon onClick={() => handleAccordion()} /> : <MenuIcon onClick={() => handleAccordion()} />}>
        <Typography color={grey[400]} sx={{ fontWeight: 'bold', textDecoration: "none", alignSelf:'center'}} variant="h6">
            Cage Free Hub
          </Typography>
          <Box bgcolor='primary.main' sx={{ ...styles.betaBox }}>
            <Typography color="common.white" variant="h6" component="div" sx={{ fontSize: 12 }}>
              Beta
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}/>
          <Button size="square"
          onClick={() => handleAccordion()}
          style={{
            backgroundColor:'#EFFAF9', 
            color:'#3FAB94',  
            border:'0',
            alignSelf:'center'
          }}
          sx={{marginRight:2}}>
            <HelpOutlineIcon fontSize='support_icon'/>
          </Button>
        </AccordionSummary>
        <List>
          <ListItem button component={Link} to="/login" onClick={() => handleAccordion()} sx={{ display: currentUser ? 'none' : 'block' }}>
            <Typography variant='p_large' sx={{ margin:'auto' }}>Log in</Typography>
          </ListItem>
          <Box sx={{ display: currentUser ? 'block' : 'none' }}>
            <ListItem button component={Link} to={editProfileLink} onClick={() => handleAccordion()}>
              <Typography variant='p_large' sx={{ margin:'auto' }}>Edit profile</Typography>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {handleAccordion();setTimeout(() => {logout()}, 100)}} >
              <Typography variant='p_large' sx={{ margin:'auto' }}>Log out</Typography>
            </ListItem>
          </Box>
          <Divider />
          <SupportPopup />
          <Divider />
        </List>
      </Accordion>
    </AppBar>
    <AppBar color="secondary" elevation={0} position="sticky" sx={{ display:{ xs:'none', sm:'block'} }}>
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
            <Button variant="outlined" 
              style={{
                backgroundColor:'#EFFAF9', 
                color:'#3FAB94',  
                border:'0'
              }}
              onClick={(e) => setSupportPopupAnchorEl(e.currentTarget)}
            >
              <HelpOutlineIcon fontSize='small' style={{ marginRight:6}}/>
              {t('support')}
            </Button>
            <Popover
              open={Boolean(supportPopupAnchorEl)}
              anchorEl={supportPopupAnchorEl}
              onClose={() => setSupportPopupAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <SupportPopup/>
            </Popover>
          </Box>
          <Box>
            <Button variant='contained' sx={{ display:currentUser?.uid === adminUid ? 'block' : 'none' }} onClick={() => {navigate('/admin')}} >ADMIN PORTAL</Button>
          </Box>
          {/* //NO TRANSLATIONS YET */}
          <Box sx={{ display:'block' }} >
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
                {Object.keys(languages).map((languageSymbol) => (
                  <MenuItem key={languageSymbol} onClick={(event) => handleChangeLanguage(event, languageSymbol)}>
                    {languages[languageSymbol]}
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
              <MenuItem onClick={(e) => { handleEditProfile(e);  }}>{t('editProfile')}</MenuItem>
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
            <MenuItem component={Link} to="/Login" onClick={(e) => handleCloseNavMenu(e)}>
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