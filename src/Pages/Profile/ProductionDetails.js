import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Select, Typography, MenuItem, TextField, Paper, Input } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

function ProductionDetails() {
  const [setPage, goToPage, setGoToPage, saveData, data] = useOutletContext()
  const [certification, setCertification] = useState('')
  const [productionSystem, setProductionSystem] = useState([])
  const certifyingOrganizationRef = useRef()
  //const [images, setImages]
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Production details')
    setProductionSystem(data.productionDetails.productionSystem)
    setCertification(data.productionDetails.certification)
    certifyingOrganizationRef.current.value = data.productionDetails.certifyingOrganization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function sendData() {
    const productionDetails = {
      productionSystem: productionSystem,
      certification: certification,
      certifyingOrganization: certification === certificationOpts[2] ? '' : certifyingOrganizationRef.current.value
    }

    saveData({productionDetails: productionDetails})
  }

  useEffect(() => {
    if (goToPage === '') {return}
    sendData()
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

  return (
    <Box sx={{ display:'flex', flexDirection:'column' }} >
      <Typography variant="h1_32">Production details</Typography>
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Production system of farm(s)</Typography>
      <Select multiple renderValue={Opts => Opts.map((opt) => opt = opt.split(':')[0]).join('; ') }  value={productionSystem} onChange={(e) => setProductionSystem(e.target.value)}>
        {productionSystemOpts.map((productionSystem, i) => (
          <MenuItem key={i} value={productionSystem}>{productionSystem}</MenuItem>
        ))}
      </Select>
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>
        Do you have cage-free egg certification?
      </Typography>
      <Select value={certification} onChange={(e) => setCertification(e.target.value)}>
        {certificationOpts.map((certificationOpt, i) => (
          <MenuItem key={i} value={certificationOpt}>{certificationOpt}</MenuItem>
        ))}
      </Select>
      <Box  sx={{ marginTop:4, display:(certification === certificationOpts[0] || certification === certificationOpts[1]) ? 'block' : 'none' }}>
        <Typography variant="label">Title of certifying organization</Typography>
        <TextField fullWidth inputRef={certifyingOrganizationRef} sx={{ marginTop:1 }}></TextField>
      </Box>
      {certification === certificationOpts[0] && 
        <Box sx={{ marginTop:4 }}>
          <Typography variant="label" sx={{ marginBottom:1 }}>
            Upload certification
          </Typography>
          <Input fullWidth type="file" />
        </Box>
      }
    </Box>
  )
}

export default ProductionDetails