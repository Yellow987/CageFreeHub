import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

function SupportPopup() {
  const { t } = useTranslation(['navbar']);

  return (
    <Box sx={{ maxWidth:'280px', p:2 }}>
        <Typography variant='p_default' fontWeight='Bold' color='#1B2B3E'>
            {t('questions')}
        </Typography>
        <Typography variant='p_default' style={{wordWrap: 'break-word'}}>
            {t('pleaseEmail')} <Box component="a" href={`mailto:cagefreehub@globalfoodpartners.com`}>cagefreehub@globalfoodpartners.com</Box>
        </Typography>
    </Box>
  )
}

export default SupportPopup