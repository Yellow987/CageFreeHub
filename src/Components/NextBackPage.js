import React from 'react'
import { Typography, Box, Button } from '@mui/material';
import { useAuth } from '../AuthContext';
import adminUid from '../AdminAccountsConfig';

function NextBackPage( props ) {
  const { doNextBack, backPage, nextPage, submit = false } = props.props
  const { currentUser } = useAuth()

  return (
    <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
      <Button onClick={() => { doNextBack(backPage) }}>
        <Typography variant='p_default'>← Back</Typography>
      </Button>
      <Button variant='contained' type='submit' style={{ marginLeft:"8px" }}>
          {submit ? "Submit" : "Next →"}
      </Button>
      {currentUser.uid === adminUid && <Button variant='contained' style={{ marginLeft:"8px" }} onClick={() => { doNextBack(nextPage) }}>
          ADMIN skip validation Next →
      </Button>}
    </Box>
  )
}

export default NextBackPage