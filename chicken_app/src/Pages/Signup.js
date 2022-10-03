import { React, useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from './../firestore';
import { Button } from '@mui/material';


function Signup(props) {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

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
    <Box m="auto" sx={{ maxWidth:'400px', mt:'116px' }}>
      <Typography variant='h1'>
        Sign up to list your cage-free profile
      </Typography>
      <TextField label="Email" variant="outlined" style={{ marginTop:32 }} onChange={(event)=>{
        setEmail(event.target.value)
      }} />
      <TextField label="Password" variant="outlined" style={{ marginTop:32 }} onChange={(event)=>{
        setPassword(event.target.value)
      }} />
      <Button variant='contained' sx={{ display:'block', marginTop:4 }}>Sign upfaefa</Button>
    </Box>
  )
}

export default Signup