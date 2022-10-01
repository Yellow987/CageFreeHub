import { React, useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from './../firestore';
function Signup(props) {
  const [registerEmail, setRegisterEmail]= useState("");
  const [registerPassword, setRegisterPassword]= useState("");
  const [loginEmail, setLoginEmail]= useState("");
  const [loginPassword, setLoginPassword]= useState("");

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user)
    }catch (error){
      console.log(error.message);
    }
  }
  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user)
    }catch (error){
      console.log(error.message);
    }
  }
  const logout = async () => {
    await signOut();
  }
  return (
    <div>
    <Box display="flex" justifyContent="center" alignItems="center" style={{maxWidth:480}}>
        <Typography className='signupText'>
          Sign up to list your cage-free profile
        </Typography>
      <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event)=>{
        setRegisterEmail(event.target.value)
      }} />
      <TextField id="outlined-basic" label="Password" variant="outlined"  onChange={(event)=>{
        setRegisterPassword(event.target.value)
      }} />
      <button onClick={register}>Sign up</button>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center" style={{maxWidth:480}}>
        <Typography className='signupText'>
          Sign in
        </Typography>
      <TextField id="outlined-basic" label="Email" variant="outlined"  onChange={(event)=>{
        setLoginEmail(event.target.value)
      }}/>
      <TextField id="outlined-basic" label="Password" variant="outlined"  onChange={(event)=>{
        setLoginPassword(event.target.value)
      }}/>
      <button onClick={login}>Login</button>
    </Box>
    <button>Log Out</button>
    </div>
  )
}

export default Signup