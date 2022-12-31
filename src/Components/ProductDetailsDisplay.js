import React from 'react'
import { Box, Typography, Grid  } from '@mui/material';

function ProductDetailsDisplay(props) {
  const { productDetails } = props.props
  const types = ['Shell', 'Frozen', 'Liquid', 'Powder', 'Other']
  const productTypes = Object.keys(productDetails)

  function isPresentType(type) {
    return productTypes.includes(type)
  }

  return (
    <Box display='flex' flexDirection='column'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="label">Cage-free egg type</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="label" >Production capacity (year) / Price</Typography>
        </Grid>
      </Grid>
      {types.filter(isPresentType).map((type) => {
        return(
          <Grid container spacing={2} key={type} marginTop='8px'>
            <Grid item xs={4}>
              {type}
            </Grid>
            <Grid item xs={8}>
              {productDetails[type].capacity + ' ' + productDetails[type].unit + ' / $' + productDetails[type].price + " per " + productDetails[type].unit.slice(0, productDetails[type].unit.length - 1).toLowerCase()}
            </Grid>
          </Grid>
        )
      })}
    </Box>
  )
}

export default ProductDetailsDisplay