import { React, useState } from 'react'
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from './../firestore';
import { Button } from '@mui/material';


function Signup(props) {
  const { hereTo } = props.props
  const format = {
    marginTop:4, 
  }
  const hyperlink = {
    fontWeight:'Bold',
    display:"inline",
    color:'primary.main'
  }

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const handleCheckboxChange = (event) => {

  }

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user)
    }catch (error){
      console.log(error.message);
    }
  }
  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user)
    }catch (error){
      console.log(error.message);
    }
  }
  const logout = async () => {
    await signOut();
  }

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'400px', mt:'116px' }}>
      <Typography variant='h1'>
        Sign up to list your cage-free profile
      </Typography>
      <TextField fullWidth label="Email" variant="outlined" sx={{ ...format }} onChange={(event)=>{
        setEmail(event.target.value)
      }} />
      <TextField fullWidth label="Password" variant="outlined" sx={{ ...format }} onChange={(event)=>{
        setPassword(event.target.value)
      }} />
      <FormControlLabel sx={{ ...format, display: hereTo === 'Login' ? 'none' : 'show' }}
      label={
        <Typography variant='p_small'>
          Yes, I understand and agree to the <Box sx={{...hyperlink}}>Cage Free Hub Terms of Service</Box>
        </Typography>
      } control={
        <Checkbox onChange={handleCheckboxChange}></Checkbox>
      }/>
      <Button fullWidth variant='contained' sx={{ ...format }}>Sign upfaefa</Button>
      <Typography align='center' variant='p_default' sx={{marginTop: 6, display: hereTo === 'Login' ? 'none' : 'show' }}>
        Already have an account? <Box sx={{...hyperlink}} >hereto: {hereTo}</Box>
      </Typography>
    </Box>
  )
}

export default Signup