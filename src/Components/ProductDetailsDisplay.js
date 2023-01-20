import React from 'react'
import { Box, Typography, Grid, Divider } from '@mui/material';

function ProductDetailsDisplay(props) {
  const { productDetails, divs = false } = props.props
  const types = ['Shell', 'Frozen', 'Liquid', 'Powder', 'Other']
  const presentTypes = types.filter(isPresentType)

  function isPresentType(type) {
    const productTypes = Object.keys(productDetails)
    return productTypes.includes(type)
  }

  return (
    <Box display='flex' flexDirection='column'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="label">Cage-free egg type</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="label" >Production capacity (year)</Typography>
        </Grid>
      </Grid>
      {presentTypes.map((type, index) => {
        return(
          <Grid container spacing={divs ? 1 : 2} key={type} marginTop='8px'>
            <Grid item xs={4}>
              {type}
            </Grid>
            <Grid item xs={8}>
              {productDetails[type].capacity + 
              ' ' + productDetails[type].unit }
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