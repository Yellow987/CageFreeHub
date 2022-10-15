import { React, useState, useRef } from "react";
import MailIcon from "@mui/icons-material/Mail";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getAuth, sendEmailVerification } from "firebase/auth";

import { Box, ThemeProvider, createTheme, Typography } from "@mui/material";
import { borders } from "@mui/system";
import { Button } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      paper: "#f1faf8",
    },
    typography: {
      body1: {
        color: "#6bb09e",
      },
    },
    text: {
      primary: "#6bb09e",
    },
  },
});

function ConfirmEmail() {
  const [emailSent, setEmailSent] = useState({ isEmailSent:true, emailSentDetails:"Email verification sent!"});
  const auth = getAuth();
  console.log("emailSent", emailSent);
  sendEmailVerification(auth.currentUser).then(() => {
    setEmailSent({ isEmailSent:true, emailSentDetails:"Email verification sent!"});
  });
  console.log("emailSent2", emailSent);
  return (
    <ThemeProvider theme={theme}>
      <Box align='flex' mx={{ sm:'auto', xs:'24px' }} sx={{margin: 'auto', maxWidth:'700px', mt:{ sm:'116px', xs:'24px'}, borderColor: 'text.primary', color: "success.main" }}>
        <Alert icon={<MailIcon fontSize="inherit" sx={{marginTop: "3px", color: '#6bb09e'}}/>} severity="success" sx={{backgroundColor: "background.paper", marginTop: "15px", marginBottom: "-5px", }}>
          <AlertTitle variant="h5" sx={{color: '#6bb09e', fontColor: "text.primary", fontWeight: "bold" }}>
            Confirm your email
          </AlertTitle>
          <Typography style={{color: '#6bb09e'}}>
            An email with a confirmation link has been sent to the provided
            email address. Please confirm this link for the opportunity to view
            our directory of cage-free egg sellers.{" "}
          </Typography>
        </Alert>
        <Button sx={{margin: 'auto', border:"1px solid #DFE3E9", radius:"3px", fontWeight: "bold", color: "#7ab8a8", backgroundColor: "background.paper", marginTop: "15px", marginBottom: "10px", }} type="submit" fullWidth>
          Resend confirmation email
        </Button>
          <Alert severity='error' sx={{margin: 'auto', display: emailSent.isEmailSent ? "flex" : "none" }}>
            <AlertTitle>{emailSent.emailSentDetails}</AlertTitle>
          </Alert>
      </Box>
    </ThemeProvider>
  );
}
export default ConfirmEmail;