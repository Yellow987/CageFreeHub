import React from 'react'
import { Link } from 'react-router-dom'

import { Alert, Box, Button, Container, Typography} from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

function Welcome() {

  return (
    <Container maxWidth="sm" sx={{ display: 'grid', placeItems:'center', height:'85vh'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px'}}>
        <Typography variant="h1_32">Welcome to Cage Free Hub!</Typography>
        <Typography variant='p_large' sx={{ marginTop: 2, marginBottom: 4 }}>
          We’ll need some information about your company, and your farm, to create a profile to present to interested buyers. <em>This should take about 10 minutes!</em>
        </Typography>
        <Button variant='contained' component={Link} to='/profile/basics'>
          Begin
          <ArrowRightAltIcon fontSize="inherit" style={{ fontSize: "20px" }} />
        </Button>
        <Alert sx={{ marginTop: 7 }} iconMapping={{ success: <WorkOutlineIcon sx={{ margin:'auto' }} /> }}>
          <Typography variant='p_default' color='#3FAB94' ><b>Note:</b> All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
        </Alert>
      </Box>
    </Container>
  )
}

export default Welcome