import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Typography, TextField, Box, MenuItem, Select, Button } from '@mui/material';

function Locations() {
  const [setPage, goToPage, setGoToPage, saveData, data] = useOutletContext()
  const navigate = useNavigate()
  const cityRefs = useRef([])
  const [countries, setCountries] = useState([])
  const supportedCountries = ["China", "India", "Indonesia", "Japan", "Malaysia", "Philippines", "Thailand"]

  useEffect(() => {
    setPage('Location(s)')
    data.locations.forEach((location, i) => {
      cityRefs.current[0].value = location.city
      countries.push(location.country)
    })
  }, [setPage])
  
  useEffect(() => {
    if (goToPage === '') {return}
    const locations = []
    for (let i = 0; i < countries.length; i++) {
      locations.push({
        city: cityRefs.current[i].value,
        country: 'owo'
      })
    }
    saveData({ locations: locations })
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile/contact')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/basics')
    }
  }, [goToPage])
  
  return (
    <Box sx={{ display:'flex', flexDirection:'column' }}>
      <Typography variant="h1_32" >Location(s)</Typography>
      <Typography variant="label" sx={{ marginTop:4 }} >Farm Location</Typography>
      {data.locations.map((location, i) => (
        <Box key={i} sx={{ background:'#F5F7F8', padding:'16px', marginTop:1 }}>
          <Typography variant="label" >City</Typography>
          <TextField fullWidth sx={{ marginTop:1, marginBottom:2, background:'#FFFFFF' }} inputRef={el => cityRefs.current[i] = el}></TextField>
          <Typography variant="label" >Country</Typography>
          <Select fullWidth sx={{ marginTop:1, background:'#FFFFFF' }} value=''>
            {supportedCountries.map((supportedCountry) => (
              <MenuItem key={supportedCountry} value={supportedCountry}>{supportedCountry}</MenuItem>
            ))}
          </Select>
        </Box>
      ))}
      <Button sx={{ marginTop:3 }} onClick={() => {console.log(cityRefs)}}>
        <Typography variant='p_small'>+ I have an additional farm location</Typography>
      </Button>
      <Typography variant="label" sx={{ marginTop:4 }}>Distribution country (countries)</Typography>
    </Box>
  )
}

export default Locations