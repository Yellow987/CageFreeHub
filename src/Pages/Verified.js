import { React, useEffect, useState } from "react";
//import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, Typography } from "@mui/material";
import { useAuth } from "../AuthContext";
import { verifyEmailViaActionCode } from "../firestore";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { updateBuyer } from "../firestore";

function Verified() {
  const { currentUser } = useAuth()
  const [noErrors, setNoErrors] = useState(null)
  
  function getParameterByName( name ){
    name = name.replace(/[[]/,"\\[").replace(/[\]]/,"\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  useEffect(() => {
    const actionCode = getParameterByName("oobCode")
    if (currentUser.emailVerified) {
      setNoErrors(true)
      return
    }
    if (actionCode === '') {return}
    console.log('verifying')
    verifyEmailViaActionCode(actionCode)
    .catch((error) => {
      setNoErrors(false)
    })
    .then((resp) => {
      updateBuyer(currentUser.uid, {status: 'pending'}).then(() => {
        setNoErrors(true)
      })
    })
  }, [currentUser])

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'400px', mt:{ sm:'128px', xs:'24px'} }}>
      {noErrors !== null && !noErrors && <div>something went wrong</div>}
      {noErrors && <div>
        <Box display="flex" alignItems='center' color='#3FAB94'>
          <Typography variant='h2'>
            Email verified
          </Typography>
          <CheckCircleOutlineIcon sx={{ marginLeft:1 }} />
        </Box>
        <Typography variant='label' marginTop='48px'>Approval status</Typography>
        <Typography 
          variant='h2' 
          color='#CDA957'
          marginTop={1} 
          marginBottom={1}
          display="flex"
          alignContent='center'
        >
          Pending
        </Typography>
        <Typography variant='p_default'>
        Out of respect for our sellers, we need to do a quick check to make sure you are a legitimate buyer! You will receive an email when your profile is approved (this will take 48 business hours at most). Then you’ll be able to access the directory!
        </Typography>
      </div>}
    </Box>
  )
}

export default Verified