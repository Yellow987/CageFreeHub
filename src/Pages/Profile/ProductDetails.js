import { Alert, Select, TextField, Typography, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box } from '@mui/system'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useForm } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage'
import { useTranslation } from 'react-i18next'

function ProductDetails() {
  const { t } = useTranslation(['sellerForm', 'validation'])
  const [setPage, saveData, data] = useOutletContext()
  const types = [t('shell'), t('frozen'), t('liquid'), t('powder'), t('other')]
  const [inputStates, setInputStates] = useState(types.reduce((map, type) => { return {...map, [type]: {unit:t('tons')} }; }, {}))
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(types.reduce((map, type) => { return {...map, [type]: [type] in data.productDetails }; }, {}))
  const { handleSubmit, setError, getValues, formState: { errors }, register, clearErrors } = useForm({
    defaultValues: {
      productionDetails: { 
        ...types.reduce((map, type) => { 
          return {...map, [type]: {} }; 
        }, {}),
        ...data.productDetails
      }
    }
  })
  
  useEffect(() => {
    setPage(t('product-details'))
    let temp = {}
    Object.entries(data.productDetails).forEach(([product, details]) => {
      temp = {...temp, [product]: { isChecked:true, unit:details.unit } }
    })
    setInputStates({...inputStates, ...temp})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  function validateChangePage(newPage) {
    for (const checked of Object.values(isChecked)) {
      if (checked) {
        changePage(newPage)
        return
      }
    }

    setError("selectedOne", { message: t('validation:please-select-at-least-one-option')})
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
        }
        let objectiveCapacity = 0
        if (productDetails[type].unit === t('eggs')) {
          objectiveCapacity = productDetails[type].capacity
        } else if (productDetails[type].unit === t('kilograms')) { 
          objectiveCapacity = productDetails[type].capacity * 22.7272682178 //Conversion factor for ordering on seller page
        } else if (productDetails[type].unit === t('tons')) {
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
      <Typography variant='h1_32' >{t('product-details')}</Typography>
      <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
        <Typography variant='p_default' color='#3FAB94' >{t('all-information-provided-is-completely-confidential-we-do-not-share-information-with-third-parties-and-buyers-must-be-confirmed-by-us-to-access-profiles')}</Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>{t('cage-free-egg-types')}</Typography>
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
              <Typography variant='p_default_bold' color='#596676;' sx={{ marginTop:2 }}>{t('total-production-capacity-per-year')}</Typography>
              <Box sx={{ marginTop:1 }}>
                <TextField 
                  {...register(`productionDetails.${type}.capacity`, { 
                    valueAsNumber: true,
                    validate: (v) => {
                      if (isChecked[type] && v === "") {
                        return t('validation:this-field-is-required')
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
                  <InputLabel id='unit' >{t('unit')}</InputLabel>
                  <Select value={inputStates[type]['unit']} onChange={(e) => {setInputStates({...inputStates, [type]:{...inputStates[type], unit:e.target.value} })}} label='unit' labelId='unit'>
                    <MenuItem value={t('tons')}>{t('tons')}</MenuItem>
                    <MenuItem value={t('eggs')}>{t('eggs')}</MenuItem>
                    <MenuItem value={t('kilograms')}>{t('kilograms')}</MenuItem>
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