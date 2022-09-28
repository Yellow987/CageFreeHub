import React from 'react'
import { Box, Typography } from '@mui/material'

function Signup(props) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{maxWidth:480}}>
        <Typography className='signupText'>
          Sign up to list your cage-free profile
        </Typography>
    </Box>
  )
}

export default Signup