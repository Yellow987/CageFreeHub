import { useState, useEffect } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useAuth } from '../AuthContext'
import { sendVerificationEmail } from './../firestore';
import { useNavigate } from 'react-router';
import { useTranslation } from "react-i18next";

function ConfirmEmail() {
  const { t } = useTranslation(['verification'])
  const { currentUser } = useAuth();
  const [ hasSentEmail, setHasSentEmail ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkVerified = setInterval(function() {
      currentUser.reload();
      if (currentUser.emailVerified) {
        clearInterval(checkVerified)
        navigate('/verified')
      }
    }, 5000);
  }, [currentUser, navigate])

  function sendEmail(e) {
    e.preventDefault()
    console.log(currentUser.emailVerified)
    if (!currentUser.emailVerified){
      sendVerificationEmail()
      setHasSentEmail(true)
    }
  }

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'620px', mt:{ sm:'128px', xs:'24px'} }} align='center'>
      <Alert icon={<EmailOutlinedIcon sx={{ margin: "auto" }}/>} severity="success" align='left'>
        <AlertTitle color="primary.main" style={{ fontWeight:'bold' }}>{t('confirm-your-email')}</AlertTitle>
        <Typography color="primary.main">
          {t('an-email-with-a-confirmation-link-has-been-sent-to-the-provided-email-address-please-confirm-this-link-for-the-opportunity-to-view-our-directory-of-cage-free-egg-sellers')} </Typography>
      </Alert>
      <Button variant="outlined" style={{ marginTop:'60px', align:'center'}} onClick={(e) => { sendEmail(e);} }>
        {t('resend-confirmation-email')}
      </Button>
      {hasSentEmail && <Alert sx={{ marginTop:'16px' }}>
        <Typography color='primary.main'>{t('email-verification-sent')}</Typography>
      </Alert>}
    </Box>
  );
}
export default ConfirmEmail;