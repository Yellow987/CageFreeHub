import { React, useEffect } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

function Verified() {
  const Navigate = useNavigate()
  const { currentUserInfo } = useAuth()

  useEffect(() => {
    setTimeout(function() {
      if (currentUserInfo.isSeller) {
        Navigate('/profile/welcome')
      } else  {
        Navigate('/buyer-setup')
      }
    }, 1000 * 3);
  }, [Navigate, currentUserInfo])

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'620px', mt:{ sm:'128px', xs:'24px'} }} align='center'>
      <Alert icon={<EmailOutlinedIcon sx={{ margin: "auto" }}/>} severity="success" align='left'>
        <AlertTitle color="primary.main" style={{ fontWeight:'bold' }}>Your email has been verified</AlertTitle>
        <Typography color="primary.main">
          You will be redirected to the next page shortly... <CircularProgress size="1rem" style={{ display:'inline-block' }}/> .
        </Typography>
      </Alert>
    </Box>
  )
}

export default Verified