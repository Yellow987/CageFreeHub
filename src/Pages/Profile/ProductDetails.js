import { Alert, Select, TextField, Typography, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box } from '@mui/system'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useForm } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage'

function ProductDetails() {
  const [setPage, saveData, data] = useOutletContext()
  const types = ['Shell', 'Frozen', 'Liquid', 'Powder', 'Other']
  const [inputStates, setInputStates] = useState(types.reduce((map, type) => { return {...map, [type]: {unit:'Eggs', currency:'USD'} }; }, {}))
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(types.reduce((map, type) => { return {...map, [type]: [type] in data.productDetails }; }, {}))
  const { handleSubmit, setError, getValues, formState: { errors }, register, clearErrors } = useForm({
    defaultValues: {
      productionDetails: { 
        ...types.reduce((map, type) => { return {...map, [type]: {} }; }, {}),
        ...data.productDetails
      }
    }
  })
  
  useEffect(() => {
    setPage('Product details')
    let temp = {}
    Object.entries(data.productDetails).forEach(([product, details]) => {
      temp = {...temp, [product]: { isChecked:true, unit:details.unit, currency:details.currency } }
    })
    setInputStates({...inputStates, ...temp})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validateChangePage(newPage) {
    for (const checked of Object.values(isChecked)) {
      if (checked) {
        changePage(newPage)
        return
      }
    }

    setError("selectedOne", { message: "Please select at least one option"})
  }

  function changePage(newPage) {
    const productDetails = {}
    const values = getValues("productionDetails")
    let maxObjectiveCapacity = 0
    for (const [type, checked] of Object.entries(isChecked)) {
      if (checked) {
        productDetails[type] = {
          capacity : values[type].capacity,
          unit : inputStates[type]['unit'],
          price : values[type].price,
          currency : inputStates[type]['currency'] 
        }
        let objectiveCapacity = 0
        if (productDetails[type].unit === "Eggs") {
          objectiveCapacity = productDetails[type].capacity
        } else if (productDetails[type].unit === "Kilograms") { 
          objectiveCapacity = productDetails[type].capacity * 22.7272682178 //Conversion factor for ordering on seller page
        } else if (productDetails[type].unit === "Tons") {
          objectiveCapacity = productDetails[type].capacity * 20617.83 //Conversion factor for ordering on seller page
        }
        productDetails[type]['objectiveCapacity'] = objectiveCapacity
        maxObjectiveCapacity = maxObjectiveCapacity < objectiveCapacity ? objectiveCapacity : maxObjectiveCapacity
      }
    }
    saveData({productDetails: productDetails, maxObjectiveCapacity: parseFloat(maxObjectiveCapacity)})
    navigate(newPage)
  }

  return (
    <Box component='form' onSubmit={handleSubmit(() => validateChangePage("/profile/production-details"))}>
      <Typography variant='h1_32' >Product details</Typography>
      <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
        <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Cage-free egg types</Typography>
      {types.map((type) => (
        <Box key={type}>
          <FormControlLabel sx={{ marginTop:2, display:'flex', flexDirection:'row' }} control={
            <Checkbox 
              checked={isChecked[type]} 
              onClick={() => { setIsChecked({...isChecked, [type]:!isChecked[type]}); clearErrors()} } 
              />} 
            label={type} 
          />
          <Box sx={{ display:isChecked[type] ? 'block' : 'none' }}>
            <Box >
              <Typography variant='p_default_bold' color='#596676;' sx={{ marginTop:2 }}>Total production capacity (per year)</Typography>
              <Box sx={{ marginTop:1 }}>
                <TextField 
                  {...register(`productionDetails.${type}.capacity`, { 
                    valueAsNumber: true,
                    validate: (v) => {
                      if (isChecked[type] && v === "") {
                        return "This field is required"
                      }
                      return true
                    }
                   })}
                  type='number'
                  inputProps={{ min: "0", step: "any" }}
                  sx={{ 
                    marginRight:'5%', 
                    width:'47.5%',
                    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                    "input[type=number]": {
                      MozAppearance: "textfield",
                    },
                  }}
                  error={!!errors.productionDetails?.[type]?.capacity}
                  helperText={errors.productionDetails?.[type]?.capacity?.message}
                />
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
                <TextField 
                  sx={{ 
                    marginRight:'5%', 
                    width:'47.5%',
                    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                    "input[type=number]": {
                      MozAppearance: "textfield",
                    }, 
                  }} 
                  {...register(`productionDetails.${type}.price`, { 
                    validate: (v) => {
                      if (isChecked[type] && v === "") {
                        return "This field is required"
                      }
                      return true
                    }
                   })}
                  type='number'
                  inputProps={{ min: "0", step: "0.01" }}
                  error={!!errors.productionDetails?.[type]?.price}
                  helperText={errors.productionDetails?.[type]?.price?.message}
                />
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
      <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors?.selectedOne?.message}</FormHelperText>
      <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/contact", nextPage:"/profile/production-details" }}/>
    </Box>
  )
}

export default ProductDetails