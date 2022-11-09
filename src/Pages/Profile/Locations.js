import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Typography, TextField, Box, MenuItem, Select, Button } from '@mui/material';

function Locations() {
  const [setPage, goToPage, setGoToPage, saveData, data] = useOutletContext()
  const navigate = useNavigate()
  const cityRefs = useRef([])
  const [countries, setCountries] = useState(data.locations.reduce((acc, location) => {return [...acc, location.country]}, []))
  const supportedCountries = ["China", "India", "Indonesia", "Japan", "Malaysia", "Philippines", "Thailand"]

  useEffect(() => {
    setPage('Location(s)')
    data.locations.forEach((location, i) => {
      cityRefs.current[i].value = location.city
    })
  }, [data.locations, setPage])
  
  useEffect(() => {
    if (goToPage === '') {return}
    const locations = []
    for (let i = 0; i < countries.length; i++) {
      locations.push({
        city: cityRefs.current[i].value,
        country: countries[i]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  function removeLocation(index) {
    for (let i = index; i < countries.length - 1; i++) {
      cityRefs.current[i].value = cityRefs.current[i + 1].value
    }
    cityRefs.current.pop()
    const countryCopy = [...countries]
    countryCopy.splice(index, 1); 
    setCountries(countryCopy)
  }
  
  return (
    <Box sx={{ display:'flex', flexDirection:'column' }}>
      <Typography variant="h1_32" >Location(s)</Typography>
      <Typography variant="label" sx={{ marginTop:4 }} >Farm Location</Typography>
      {countries.map((location, i) => (
        <Box key={i} sx={{ background:'#F5F7F8', padding:'16px', marginTop:1 }}>
          <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
            <Typography variant="label" >City</Typography>
            {i !== 0 && <Button sx={{ height:'24px' }} color='danger' variant='contained' disableElevation onClick={() => {removeLocation(i)} }>Remove location</Button>}
          </Box>
          <TextField fullWidth sx={{ marginTop:1, marginBottom:2, background:'#FFFFFF' }} inputRef={el => cityRefs.current[i] = el}></TextField>
          <Typography variant="label" >Country</Typography>
          <Select fullWidth sx={{ marginTop:1, background:'#FFFFFF' }} value={countries[i]} onChange={(e) => {const copy = [...countries]; copy[i] = e.target.value; setCountries(copy) }}>
            {supportedCountries.map((supportedCountry) => (
              <MenuItem key={supportedCountry} value={supportedCountry}>{supportedCountry}</MenuItem>
            ))}
          </Select>
        </Box>
      ))}
      <Button sx={{ marginTop:3 }} onClick={() => {setCountries([...countries, ''])}}>
        <Typography variant='p_small'>+ I have an additional farm location</Typography>
      </Button>
      <Typography variant="label" sx={{ marginTop:4 }}>Distribution country (countries)</Typography>
    </Box>
  )
}

export default Locations