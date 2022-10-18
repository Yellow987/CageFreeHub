import { Alert, Select, TextField, Typography, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl } from '@mui/material'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box } from '@mui/system'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

function ProductDetails() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const types = ['Shell', 'Frozen', 'Liquid', 'Powder', 'Other']
  const [inputStates, setInputStates] = useState(types.reduce((map, type) => { return {...map, [type]: {isChecked:false, unit:'Eggs', currency:'USD'} }; }, {}))
  const inputRefs = useRef(types.reduce((map, type) => { return {...map, [type]:{capacityRef:'', priceRef:''} }; }, {}))
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Product details')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveData() {
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
    
    return productDetails
  }

  useEffect(() => {
    if (goToPage === '') {return}
    saveData()  
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile/production-details')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/contact')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  return (
    <Box>
      <Typography variant='h1_32' >Product details</Typography>
      <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
        <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Cage-free egg types</Typography>
      {types.map((type) => (
        <Box key={type}>
          <FormControlLabel sx={{ marginTop:2, display:'flex', flexDirection:'row' }} control={<Checkbox onClick={() => {setInputStates({...inputStates, [type]:{...inputStates[type], isChecked:!inputStates[type]['isChecked']} })}} />} label={type} />
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
              <Typography variant='p_default_bold' color='#596676;' sx={{ marginTop:2 }}>Price per egg</Typography>
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
    </Box>
  )
}

export default ProductDetails