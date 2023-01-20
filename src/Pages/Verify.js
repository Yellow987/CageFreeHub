import { useEffect, useState } from "react";
import { verifyEmailViaActionCode } from "../firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Verify() {
  const [text, setText] = useState('')
  const { currentUser } = getAuth()
  const navigate = useNavigate()

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
    if (actionCode === '') {
      navigate('/login')
    }
    verifyEmailViaActionCode(actionCode)
    .then(() => {
      if (currentUser) {
        setText('You will be redirected shortly')
        const checkVerified = setInterval(function() {
          currentUser.reload();
          if (currentUser.emailVerified) {
            clearInterval(checkVerified)
            navigate('/verified')
          }
        }, 2000);
      } else {
        setText('You may now close this tab or login.')
      }
    })
  }, [currentUser, navigate])

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'400px', mt:{ sm:'128px', xs:'24px'} }}>
      {text !== '' && <Box display="flex" alignItems='center' color='#3FAB94' marginBottom={1}>
        <Typography variant='h2'>
          Email verified
        </Typography>
        <CheckCircleOutlineIcon sx={{ marginLeft:1 }} />
      </Box>}
      {text}
    </Box>
  )
}

export default Verify