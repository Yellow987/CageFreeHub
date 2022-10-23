import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Select, ListItemText, Typography, Checkbox, MenuItem, InputLabel, FormControl, TextField } from '@mui/material'

function ProductionDetails() {
  const [setPage, goToPage, setGoToPage, formValues] = useOutletContext();
  const {productionsystem, certifyingbody, certificationstatus} = formValues;
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Production details')
  }, [])

  function saveData() {
        
  }

  useEffect(() => {
    if (goToPage === '') {return}
    saveData()  
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile/imagery')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/product-details')
    }
  }, [goToPage])
  const certificationOpts = [
    'Yes, we are certified',
    'We are in the process of certification',
    'No, we are not (in the process of becoming) certified'
  ];
  const productionSystemOpts = [
    'Aviary: multi-level cage-free system',
    'Barn: single-level cage-free system',
    'Fixed housing: structure does not move',
    'Free-range: cage-free system that provides outdoor access',
    'Mobile unit: house or structure on wheels',
  ]
  return (
    <Box style={{
      display:'flex', 
      justifyContent:'flex-start', 
      flexFlow:'column', 
      textAlign:'left'}} >
        <Typography variant="h1_32" >Production details</Typography>
        <InputLabel style={{margin:'32px 0 10px 0'}}>
            <Typography variant="label" >
              Production system of farm(s)
            </Typography>
        </InputLabel>
        <FormControl>
            <Select
            value={typeof productionsystem[0] === 'string' ? productionsystem[0].split(',') : productionsystem[0]}
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              productionsystem[1](
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
              );
            }}
            renderValue={(selected) => selected.join(', ')}
            multiple
            placeholder={'Select production system(s) utilized'}
            >
                {
                    productionSystemOpts.map((item, index)=>{
                        return(
                            <MenuItem key={index} value={item}>
                                <Checkbox checked={productionsystem[0].indexOf(item) > -1} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
        <InputLabel style={{margin:'32px 0 10px 0'}}>
            <Typography variant="label" >
              Do you have cage-free egg certification?
            </Typography>
          </InputLabel>
          <FormControl>
            <Select
            value={certificationstatus[0]}
            onChange={(e) => certificationstatus[1](e.target.value)}
            placeholder='Select your certification status'
            >
                {
                    certificationOpts.map((option, index)=>{
                        return(
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
        {
          certificationstatus[0] == 'Yes, we are certified' &&
          <>
          <InputLabel style={{margin:'32px 0 10px 0'}}>
          <Typography variant="label" >
            Title of certifying organization
          </Typography>
        </InputLabel>
        <TextField 
            // label="Company Name" 
            variant="outlined" 
            value={certifyingbody[0]} 
            onChange={(e) => certifyingbody[1](e.target.value)}
        />
        </>
        }
    </Box>
  )
}

export default ProductionDetails