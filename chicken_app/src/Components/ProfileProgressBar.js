import React from 'react'
import { Outlet } from 'react-router'
import { Box, Grid, LinearProgress } from '@mui/material';
import { useState } from 'react';

function ProfileProgressBar() {
  // eslint-disable-next-line
  const [page, setPage] = useState('')
  

  return (
    <Box>
      <Grid container>
        <Grid item>
          hi
        </Grid>
      </Grid>
      <LinearProgress variant='buffer' valueBuffer={0} value={20} sx={{"& .MuiLinearProgress-dashed":{backgroundColor: "lightgrey",animation:"yes"}}}/>
      <Outlet context={[setPage]}/>
      back button nextButton
    </Box>
  )
}

export default ProfileProgressBar