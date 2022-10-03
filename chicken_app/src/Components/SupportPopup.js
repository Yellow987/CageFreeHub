import { Box, Typography } from '@mui/material'
import React from 'react'

function SupportPopup() {
  return (
    <Box sx={{ maxWidth:'280px', p:2 }}>
        <Typography variant='p_default' fontWeight='Bold'>
            Questions? In need of help?
        </Typography>
        <Typography variant='p_default' style={{wordWrap: 'break-word'}}>
            Please email us at <Box component="a" href={`mailto:cagefreehub@globalfoodpartners.com`}>cagefreehub@globalfoodpartners.com</Box>
        </Typography>
    </Box>
  )
}

export default SupportPopup