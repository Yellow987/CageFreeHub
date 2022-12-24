import { Alert, Select, TextField, Typography, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box } from '@mui/system'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

function ProductDetails() {
  const [setPage, saveData, data] = useOutletContext()
  const types = ['Shell', 'Frozen', 'Liquid', 'Powder', 'Other']
  const [inputStates, setInputStates] = useState(types.reduce((map, type) => { return {...map, [type]: {isChecked:false, unit:'Eggs', currency:'USD'} }; }, {}))
  const inputRefs = useRef(types.reduce((map, type) => { return {...map, [type]:{capacityRef:'', priceRef:''} }; }, {}))
  const navigate = useNavigate()
  
  useEffect(() => {
    setPage('Product details')
    let temp = {}
    Object.entries(data.productDetails).forEach(([product, details]) => {
      temp = {...temp, [product]: { isChecked:true, unit:details.unit, currency:details.currency } }
      inputRefs.current[product]['capacityRef'].value = details.capacity
      inputRefs.current[product]['priceRef'].value = details.price
    })
    setInputStates({...inputStates, ...temp})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function changePage(e, newPage) {
    e.preventDefault()
    if (isDataValid()) {
      const productDetails = {}
      for (const [type, value] of Object.entries(inputStates)) {
        if (value['isChecked']) {
          productDetails[type] = {
            capacity : inputRefs.current[type]['capacityRef'].value,
            unit : inputStates[type]['unit'],
            price : inputRefs.current[type]['priceRef'].value,
            currency : inputStates[type]['currency']
          }
        }
      }
      saveData({productDetails: productDetails})
      navigate(newPage)
    }
  }

  function isDataValid() {
      return true
  }

  return (
    <Box>
      <Typography variant='h1_32' >Product details</Typography>
      <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
        <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Cage-free egg types</Typography>
      {types.map((type) => (
        <Box key={type}>
          <FormControlLabel sx={{ marginTop:2, display:'flex', flexDirection:'row' }} control={<Checkbox checked={inputStates[type]["isChecked"]} onClick={() => {setInputStates({...inputStates, [type]:{...inputStates[type], isChecked:!inputStates[type]['isChecked']} })}} />} label={type} />
          <Box sx={{ display:inputStates[type]['isChecked'] ? 'block' : 'none' }}>
            <Box >
              <Typography variant='p_default_bold' color='#596676;' sx={{ marginTop:2 }}>Total production capacity (per year)</Typography>
              <Box sx={{ marginTop:1 }}>
                <TextField placeholder='E.g. 10,000' sx={{ marginRight:'5%', width:'47.5%' }} inputRef={el => inputRefs.current[type]['capacityRef'] = el} ></TextField>
                <FormControl sx={{ width:'47.5%' }}>
                  <InputLabel id='unit' >Unit</InputLabel>
                  <Select value={inputStates[type]['unit']} onChange={(e) => {setInputStates({...inputStates, [type]:{...inputStates[type], unit:e.target.value} })}} label='unit' labelId='unit'>
                    <MenuItem value='Eggs'>Eggs</MenuItem>
                    <MenuItem value='Tons'>Tons</MenuItem>
                    <MenuItem value='Kilograms'>Kilograms</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <Typography variant='p_default_bold' color='#596676;' sx={{ marginTop:2 }}>Price per unit (egg, ton, or kilogram)</Typography>
              <Box sx={{ marginTop:1 }}>
                <TextField placeholder='$' sx={{ marginRight:'5%', width:'47.5%' }} inputRef={el => inputRefs.current[type]['priceRef'] = el} ></TextField>
                <FormControl sx={{ width:'47.5%' }}>
                  <InputLabel id='currency' >currency</InputLabel>
                  <Select value={inputStates[type]['currency']} onChange={(e) => {setInputStates({...inputStates, [type]:{...inputStates[type], currency:e.target.value} })}} label='currency' labelId='currency'>
                    <MenuItem value='USD'>USD</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
      <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
        <Button><Typography variant='p_default' onClick={(e) => { changePage(e, "/profile/contact") }}>← Back</Typography></Button>
        <Button variant='contained' onClick={(e) => { changePage(e, "/profile/production-details") }}>
            Next →
        </Button>
      </Box>
    </Box>
  )
}

export default ProductDetails