import { React, useState, useRef } from 'react'
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';

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

  const { signup, login } = useAuth()
  const navigate = useNavigate()
  const emailRef = useRef("");
  const passwordRef = useRef("")
  const buttonRef = useRef(null)
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState(false)
  const [errors, setErrors] = useState(
    { 
      emailErrorText:"", isEmailValid: true, 
      passwordErrorText:"", isPasswordValid: true,
    }
  )

  const isEmailInvalid = (email) => {
    const isInvalid = !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/).test(email)
    return isInvalid;
  };

  function areValidationErrors() {
    let temp = {}
    let errors = false
    if (isEmailInvalid(emailRef.current.value)) {
      temp.emailErrorText = "Email is not valid." 
      temp.isEmailValid = false 
      errors = true
    } else {
      temp.emailErrorText = "" 
      temp.isEmailValid = true
    }

    if (passwordRef.current.value.length < 6) {
      temp.passwordErrorText = "password must be at least 6 characters." 
      temp.isPasswordValid = false 
      errors = true
    } else {
      temp.passwordErrorText = "" 
      temp.isPasswordValid = true
    }
    if (!isCheckBoxClicked && hereTo !== "Login") {
      errors = true
      //TODO WARN
    }


    setErrors(temp)
    return errors ? true : false
  }

  async function handleSubmit(event) {
    buttonRef.current.click()
    event.preventDefault()
    if (areValidationErrors()) {return}
    
    try {
      if (hereTo === "Login") {
        await login(emailRef.current.value, passwordRef.current.value)
      } else {
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate("/ConfirmEmail")
      }
    } catch(err) {
      console.log(err)
    }
  }

  function getTitle(hereTo) {
    switch(hereTo) {
      case 'Login':
        return 'Log in to your account';
      case 'SellerSignup':
        return 'Sign up to discover cage-free sellers';
      case 'BuyerSignup':
        return 'Sign up to list your cage-free profile';
      default: 
        return 'Error'
    }
  }

  return (
    <Box align='center' mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'430px', mt:{ sm:'116px', xs:'24px'} }}>
      <Typography variant='h1'>
        {getTitle(hereTo)}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField error={!errors.isEmailValid} helperText={errors.emailErrorText} fullWidth label="Email" variant="outlined" sx={{ ...format }} inputRef={emailRef}/>
        <TextField error={!errors.isPasswordValid} helperText={errors.passwordErrorText} fullWidth label="Password" type="password" variant="outlined" sx={{ ...format }} inputRef={passwordRef}/>
        <FormControlLabel sx={{ ...format, display: hereTo === 'Login' ? 'none' : 'block', lineHeight:0 }}
        label={
          <Typography variant='p_small' display="inline" sx={{ lineHeight: 0 }}>
            Yes, I understand and agree to the <Box sx={{...hyperlink}}>Cage Free Hub Terms of Service</Box>
          </Typography>
        } control={
          <Checkbox onChange={(event) => {setIsCheckBoxClicked(isCheckBoxClicked => !isCheckBoxClicked)}}/>
        }/>
        <Button type="submit" fullWidth  variant='contained' sx={{ ...format, fontWeight:700 }} ref={buttonRef}>
          {hereTo === 'Login' ? "Log in" : "Create Account"}
        </Button>
      </form>
      <Typography variant='p_default' sx={{marginTop: 5, display: hereTo === 'Login' ? 'none' : 'block' }}>
        Already have an account? <Box sx={{...hyperlink}} component={Link} to="/Login" >Login</Box>
      </Typography>
      <Box  sx={{ display: hereTo === 'Login' ? 'block' : 'none' }}>
        <Typography variant='p_default' sx={{marginTop: 5, marginBottom: 1}}>
          Don’t have an account?
        </Typography>
        <Typography variant='p_default' component={Link} to="/SellerSignup" sx={{ ...hyperlink, marginTop:1 }}>
          Sign up as a cage-free seller 
        </Typography>
        <Typography variant='p_default' sx={{ ...hyperlink }}> · </Typography>
        <Typography variant='p_default' component={Link} to="/BuyerSignup" sx={{ ...hyperlink }}>
          Sign up as an egg buyer
        </Typography>
      </Box>
      <Typography variant='p_default' sx={{marginTop: 2, display: hereTo === 'SellerSignup' ? { xs:'block', sm:'none'} : 'none' }}>
        Here to buy eggs instead? <Box sx={{...hyperlink}} component={Link} to="/BuyerSignup" >Sign up as a buyer</Box>
      </Typography>
      <Typography variant='p_default' sx={{marginTop: 2, display: hereTo === 'BuyerSignup' ? { xs:'block', sm:'none'}  : 'none' }}>
        Here to sell instead? <Box sx={{...hyperlink}} component={Link} to="/SellerSignup" >Sign up as an egg seller</Box>
      </Typography>
      {/* {user.email} will cause site to fail when user not signed in */}
    </Box>
  )
}

export default Signup