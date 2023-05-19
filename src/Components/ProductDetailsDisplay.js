import React from 'react'
import { Box, Typography, Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ProductDetailsDisplay(props) {
  const { t } = useTranslation('sellerForm')
  const { productDetails, divs = false } = props.props
  const types = ['Shell', 'Frozen', 'Liquid', 'Powder', 'Other']
  const typesI18n = {
    'Shell': t('shell'), 'Frozen': t('frozen'), 'Liquid': t('liquid'), 'Powder': t('powder'), 'Other': t('other')
  }
  function getI18nUnits(number, unit) {
    const unitsI18n = {
      'Tons': t('number-tons', {number: number}),
      'Eggs': t('number-eggs', {number: number}),
      'Kilograms': t('number-kilograms', {number: number}),
    }
    return unitsI18n[unit]
  }
  const presentTypes = types.filter(isPresentType)

  function isPresentType(type) {
    const productTypes = Object.keys(productDetails)
    return productTypes.includes(type)
  }

  return (
    <Box display='flex' flexDirection='column'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="label">{t('cage-free-egg-type')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="label" >{t('production-capacity-year')}</Typography>
        </Grid>
      </Grid>
      {presentTypes.map((type, index) => {
        return(
          <Grid container spacing={divs ? 1 : 2} key={type} marginTop='8px'>
            <Grid item xs={4}>
              {typesI18n[type]}
            </Grid>
            <Grid item xs={8}>
              {getI18nUnits(productDetails[type].capacity, productDetails[type].unit) }
            </Grid>
            {index !== presentTypes.length - 1 && 
              <Grid item xs={12}>
                <Divider />
              </Grid>
            }
          </Grid>
        )
      })}
    </Box>
  )
}

export default ProductDetailsDisplay