import React from 'react'
import { Typography, Box, Button } from '@mui/material';
import { useAuth } from '../AuthContext';
import adminUid from '../AdminAccountsConfig';
import { useTranslation } from 'react-i18next';

function NextBackPage( props ) {
  const { t } = useTranslation(['sellerForm'])
  const { doNextBack, backPage, nextPage, submit = false, isUploading = false } = props.props
  const { currentUser } = useAuth()

  return (
    <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
      <Button onClick={() => { doNextBack(backPage) }}>
        <Typography variant='p_default'>{t('back')}</Typography>
      </Button>
      <Button 
        variant='contained' 
        type='submit' 
        style={{ marginLeft:"8px" }}
        disabled={isUploading}
      >
        {isUploading ? t('uploading') : (submit ? t('submit') : t('next'))}
      </Button>
      {currentUser.uid === adminUid && 
        <Button 
          variant='contained' 
          style={{ marginLeft:"8px" }} 
          onClick={() => {submit ? doNextBack(nextPage, true) : doNextBack(nextPage) }}
        >
          ADMIN skip validation Next →
        </Button>
      }
    </Box>
  )
}

export default NextBackPage