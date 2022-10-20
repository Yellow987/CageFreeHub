import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Select, ListItemText, Typography, Checkbox, MenuItem, InputLabel, FormControl } from '@mui/material'

function ProductionDetails() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Production details')
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [productionSystem, setProductionSystem] = useState([]);
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
            // value={}
            // onChange={}
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
        <InputLabel style={{margin:'32px 0 10px 0'}}>
            <Typography variant="label" >
              Production system of farm(s)
            </Typography>
        </InputLabel>
        <FormControl>
            <Select
            value={productionSystem}
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              setProductionSystem(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
              );
            }}
            // renderValue={(selected) => selected.join(', ')}
            multiple
            placeholder={'Select production system(s) utilized'}
            >
                {
                    productionSystemOpts.map((item, index)=>{
                        return(
                            <MenuItem key={index} value={item}>
                                <Checkbox checked={productionSystem.indexOf(item) > -1} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    </Box>
  )
}

export default ProductionDetails