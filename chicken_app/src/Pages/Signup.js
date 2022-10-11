import { React, useState, useRef } from 'react'
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTranslation, Trans } from 'react-i18next';

function Signup(props) {
  const { hereTo } = props.props
  const format = {
    marginTop:4, 
  }
  const hyperlink = {
    fontWeight:'Bold',
    display:"inline",
    color:'primary.main',
    textDecoration: "none",
  }

  const { t } = useTranslation(['signup']);
  const { signup, login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const emailRef = useRef("");
  const passwordRef = useRef("")
  const buttonRef = useRef(null)
  const checkboxRef = useRef(false)
  const [authError, setAuthError] = useState({ isAuthError:false, errorDetails:""})
  const [errors, setErrors] = useState(
    { 
      emailErrorText:"email needs to include @ symbol", isEmailValid: true, 
      passwordErrorText:"", isPasswordValid: true,
      isCheckBoxValid: true
    }
  )

  const isEmailInvalid = (email) => {
    const isInvalid = !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/).test(email)
    return isInvalid;
  };

  function areValidationErrors() {
    let temp = {} //allowing code to set a temporary value for the email/password
    let errors = false //if errors are true, this means one of the fields in invalid
    if (isEmailInvalid(emailRef.current.value)) {
      temp.emailErrorText = t('errorEmail') //email is not valid
      temp.isEmailValid = false //setting email to not be valid
      errors = true
    } else {
      temp.emailErrorText = "" 
      temp.isEmailValid = true
    }

    if (passwordRef.current.value.length < 6) {
      temp.passwordErrorText = t('errorPassword')
      temp.isPasswordValid = false 
      errors = true
    } else {
      temp.passwordErrorText = "" 
      temp.isPasswordValid = true
    }
    if (!checkboxRef.current.checked && hereTo !== "Login") {
      errors = true
      temp.isCheckBoxValid = false
    } else {
      temp.isCheckBoxValid = true
    }


    setErrors(temp)
    return errors ? true : false
  }
  console.log("AUTH ERROR", authError);
  async function handleSubmit(event) {
    event.preventDefault()
    if (areValidationErrors()) {
      setAuthError({ isAuthError:true, errorDetails:"Invalid Username/Email or Password"})
    } else {
      setAuthError({ isAuthError:false, errorDetails:""})
    }

    setLoading(true)
    if (hereTo === "Login") {
      try{
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/SellerProfileWizard')
      } catch {
        setAuthError({ isAuthError:true, errorDetails:"Invalid Username/Email or Password"})
      }
    } else {
      try {
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate("/ConfirmEmail")
      } catch {
        setAuthError({ isAuthError:true, errorDetails:"Email is already in use"})
      }
    }
    setLoading(false)
  }

  function getTitle(hereTo) {
    switch(hereTo) {
      case 'Login':
        return t('loginTitle')
      case 'SellerSignup':
        return t('signupSellerTitle');
      case 'BuyerSignup':
        return t('signupBuyerTitle')
      default: 
        return 'Error'
    }
  }
  //setAuthError({ isAuthError:true, errorDetails:"test"});
  console.log("AUTH ERROR 2", authError);
  console.log("error details", authError.errorDetails);
  return (
    <Box align='flex' mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'430px', mt:{ sm:'116px', xs:'24px'} }}>
      <Typography variant='h1'>
        {getTitle(hereTo)}
      </Typography>
      <Alert severity='error' sx={{marginTop: "15px", marginBottom: "-5px", display: authError.isAuthError ? "flex-start" : "none"}}>
        <AlertTitle variant="h5" sx={{fontWeight: 'bold' }}>Failed to Log In</AlertTitle>
        <Typography>{authError.errorDetails}</Typography>
      </Alert>
      <form onSubmit={handleSubmit}>
        <TextField error={!errors.isEmailValid} helperText={errors.emailErrorText} fullWidth label={t('email')} variant="outlined" sx={{ ...format }} inputRef={emailRef}/>
        <TextField error={!errors.isPasswordValid} helperText={errors.passwordErrorText} fullWidth label={t('password')} type="password" autoComplete="on" variant="outlined" sx={{ ...format }} inputRef={passwordRef}/>
        <FormControlLabel sx={{ ...format, display: hereTo === 'Login' ? 'none' : 'block', lineHeight:0 }}
        label={
          <Typography variant='p_small' display="inline" sx={{ lineHeight: 0 }}>
            <Trans i18nKey='ToS' t={t} components={[<Box sx={{...hyperlink}} />]} />
          </Typography>
        } control={
          <Checkbox sx={{color: errors.isCheckBoxValid ? '' : '#FF0000'}} inputRef={checkboxRef}/>
        }/>
        <Button type="submit" disabled={loading} fullWidth  variant='contained' sx={{ ...format, fontWeight:700 }} ref={buttonRef}>
          <CircularProgress size="1.5rem" sx={{ display: loading ? 'block' : 'none' }}/>
          {!loading ? hereTo === 'Login' ? t('login') : t('createAccount') : ""}
        </Button>
      </form>
      <Typography variant='p_default' sx={{marginTop: 5, display: hereTo === 'Login' ? 'none' : 'block' }}>
        <Trans i18nKey='haveAccount' t={t} components={[<Box sx={{...hyperlink}} component={Link} to="/Login" />]} />
      </Typography>
      <Box  sx={{ display: hereTo === 'Login' ? 'block' : 'none' }}>
        <Typography variant='p_default' sx={{marginTop: 5, marginBottom: 1}}>
          {t('noAccount')}
        </Typography>
        <Typography variant='p_default' component={Link} to="/SellerSignup" sx={{ ...hyperlink, marginTop:1 }}>
          {t('signupSeller')}
        </Typography>
        <Typography variant='p_default' sx={{ ...hyperlink }}> · </Typography>
        <Typography variant='p_default' component={Link} to="/BuyerSignup" sx={{ ...hyperlink }}>
          {t('signupBuyer')}
        </Typography>
      </Box>
      <Typography variant='p_default' sx={{marginTop: 2, display: hereTo === 'SellerSignup' ? 'block' : 'none' }}>
        <Trans i18nKey="hereToBuyInstead" t={t} components={[<Box sx={{...hyperlink}} component={Link} to="/BuyerSignup" />]} />
      </Typography>
      <Typography variant='p_default' sx={{marginTop: 2, display: hereTo === 'BuyerSignup' ? 'block' : 'none' }}>
        <Trans i18nKey='hereToSellInstead' t={t} components={[<Box sx={{...hyperlink}} component={Link} to="/SellerSignup" />]} />
      </Typography>
    </Box>
  )
}

export default Signup