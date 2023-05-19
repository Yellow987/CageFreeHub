import { React, useEffect, useState } from "react";
//import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, Typography } from "@mui/material";
import { useAuth } from "../AuthContext";
import { getBuyer } from "../firestore";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { updateBuyer } from "../firestore";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Verified() {
  const { t } = useTranslation(['verification'])
  const { currentUser } = useAuth()
  const [noErrors, setNoErrors] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser.emailVerified) {
      getBuyer(currentUser.uid).then((data) => {
        if (data.status === 'incomplete') {
          updateBuyer(currentUser.uid, {status: 'pending'}).then(() => {
            setNoErrors(true)
          })
        } else {
          setNoErrors(true)
        }
        return
      })
    } else {
      navigate('/confirm-email')
    }
  }, [currentUser, navigate])

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'400px', mt:{ sm:'128px', xs:'24px'} }}>
      {noErrors && <div>
        <Box display="flex" alignItems='center' color='#3FAB94'>
          <Typography variant='h2'>
            {t('email-verified')}
          </Typography>
          <CheckCircleOutlineIcon sx={{ marginLeft:1 }} />
        </Box>
        <Typography variant='label' marginTop='48px'>{t('approval-status')}</Typography>
        <Typography 
          variant='h2' 
          color='#CDA957'
          marginTop={1} 
          marginBottom={1}
          display="flex"
          alignContent='center'
        >
          {t('pending')}
        </Typography>
        <Typography variant='p_default'>
          {t('out-of-respect-for-our-sellers-we-need-to-do-a-quick-check-to-make-sure-you-are-a-legitimate-buyer-you-will-receive-an-email-when-your-profile-is-approved-this-will-take-48-business-hours-at-most-then-youll-be-able-to-access-the-directory')}
        </Typography>
      </div>}
    </Box>
  )
}

export default Verified