import { React, useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getAuth, sendEmailVerification } from "firebase/auth";

import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";

function ConfirmEmail() {
  const [emailSent, setEmailSent] = useState({ isEmailSent:true, emailSentDetails:"Email verification sent!"});
  const auth = getAuth();
  sendEmailVerification(auth.currentUser).then(() => {
    setEmailSent({ isEmailSent:true, emailSentDetails:"Email verification sent!"});
  });

  return (
      <Box align='flex' mx={{ sm:'auto', xs:'24px' }} sx={{margin: 'auto', marginLeft: '410px', maxWidth:'620px', mt:{ sm:'128px', xs:'24px'}, borderColor: 'text.primary', color: "success.main" }}>
        <Alert icon={<MailIcon fontSize="inherit" sx={{marginTop: "3px", color: '#6bb09e'}}/>} severity="success" sx={{backgroundColor: "background.paper", marginTop: "15px"}}>
          <AlertTitle variant="h4" sx={{color: '#6bb09e', fontColor: "text.primary", fontWeight: "bold" }}>
            Confirm your email
            <Typography>
            An email with a confirmation link has been sent to the provided
            email address. Please confirm this link for the opportunity to view
            our directory of cage-free egg sellers.
            </Typography>
          </AlertTitle>
        </Alert>
        <Box align='center'>
        <Button sx={{margin: '8px', border:"1px solid #DFE3E9", radius:"3px", fontWeight: "bold", color: "#7ab8a8", backgroundColor: "background.paper"}}>
          Resend Confirmation Email
        </Button>
          <Alert severity='error' sx={{margin: '8px', display: emailSent.isEmailSent ? "flex" : "none" }}>
            <AlertTitle>{emailSent.emailSentDetails}</AlertTitle>
          </Alert>
        </Box>
      </Box>
  );
}
export default ConfirmEmail;