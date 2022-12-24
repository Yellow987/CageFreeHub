import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Select, Typography, MenuItem, TextField, Button, Link } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ProductionDetails() {
  const [setPage, saveData, data, uid] = useOutletContext()
  const [certification, setCertification] = useState(data.productionDetails.certification)
  const [productionSystem, setProductionSystem] = useState(data.productionDetails.productionSystem)
  const certifyingOrganizationRef = useRef()
  const fileInputRef = useRef();
  const [certificationFile, setCertificationFile] = useState(data.productionDetails.certificationFile)
  const navigate = useNavigate()
  const storage = getStorage()
  const certificateRef = ref(storage, uid + '/certification/certificate')

  useEffect(() => {
    setPage('Production details')
    certifyingOrganizationRef.current.value = data.productionDetails.certifyingOrganization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function changePage(e, newPage) {
    e.preventDefault()
    if (isDataValid()) {
      const productionDetails = {
        productionSystem: productionSystem,
        certification: certification,
        certifyingOrganization: certification === certificationOpts[2] ? '' : certifyingOrganizationRef.current.value,
        certificationFile: certification === certificationOpts[0] ? certificationFile : ''
      }
  
      saveData({productionDetails: productionDetails})
      navigate(newPage)
    }
  }

  function isDataValid() {
      return true
  }

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

  function handleFileUpload(e) {
    e.preventDefault()
    const certification = e.target.files[0]
    if (!certification) {
      return
    }

    uploadBytes(certificateRef, certification).then(() => {
      getDownloadURL(certificateRef).then((url) => {
        setCertificationFile({name: e.target.files[0].name, url: url})
      })
    })
  }
  
  return (
    <Box sx={{ display:'flex', flexDirection:'column' }} >
      <Typography variant="h1_32">Production details</Typography>
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Production system of farm(s)</Typography>
      <Select multiple renderValue={Opts => Opts.map((opt) => opt = opt.split(':')[0]).join('; ') } value={productionSystem} onChange={(e) => setProductionSystem(e.target.value)}>
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
          <Button color='grey' fullWidth variant='outlined' onClick={()=>fileInputRef.current.click()}>
            <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload certificate 
          </Button>
          <input 
            ref={fileInputRef} 
            type="file" 
            onChange={(e) => handleFileUpload(e)}
            style={{ display: 'none' }} 
          />
          {certificationFile.url && <Typography sx={{ marginTop:3 }}>
            <Link 
              href={certificationFile.url}
              target="_blank">
              {certificationFile.name}
            </Link>
          </Typography>}
        </Box>
      }
      <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
        <Button><Typography variant='p_default' onClick={(e) => { changePage(e, "/profile/product-details") }}>← Back</Typography></Button>
        <Button variant='contained' onClick={(e) => { changePage(e, "/profile/imagery") }}>
            Next →
        </Button>
      </Box>
    </Box>
  )
}

export default ProductionDetails