import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import {SelectSingleCountry, SelectMultipleCountries} from '../../Components/FormParts'
function Locations() {
  const [setPage, goToPage, setGoToPage, formValues] = useOutletContext()
  const navigate = useNavigate()
  useEffect(() => {
    setPage('Location(s)')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if (goToPage === '') {return}
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile/contact')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/basics')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])
  const {countryName, city, distributioncountry} = formValues;
  return (
    <Box style={{
      display:'flex', 
      justifyContent:'flex-start', 
      flexFlow:'column', 
      textAlign:'left'}} 
    >
        <Typography variant="h1_32" >Location(s)</Typography>
        <InputLabel style={{margin:'32px 0 10px 0'}}>
            <Typography variant="label" >
                Farm Location
            </Typography>
        </InputLabel>
        <Box
          style={{
            display:'flex', 
            justifyContent:'flex-start', 
            flexFlow:'column', 
            textAlign:'left',
            backgroundColor:'#F5F7F8',
            padding:'16px'
          }}
        >
            <InputLabel style={{margin:'0 0 10px 0'}}>
                <Typography variant="label" >
                City
                </Typography>
            </InputLabel>
            <TextField 
                variant="outlined" 
                value={city[0]} 
                onChange={(e) => city[1](e.target.value)}
            />
            <InputLabel style={{margin:'32px 0 10px 0'}}>
                <Typography variant="label" >
                Country
                </Typography>
            </InputLabel>
            <SelectSingleCountry 
                  country={countryName[0]} 
                  setCountry={countryName[1]}
                ></SelectSingleCountry>
        </Box>
        <InputLabel style={{margin:'32px 0 10px 0'}}>
            <Typography variant="label" >
              Distribution country (countries)
            </Typography>
        </InputLabel>
        <SelectMultipleCountries
              countries={distributioncountry[0]}
              setCountries={distributioncountry[1]}
            ></SelectMultipleCountries>
    </Box>
  )
}

export default Locations