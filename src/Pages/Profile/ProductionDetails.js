import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Select, Typography, MenuItem, TextField, Button, Link,FormHelperText, Checkbox } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm, Controller } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage'

function ProductionDetails() {
  const [setPage, saveData, data, uid] = useOutletContext()
  const fileInputRef = useRef();
  const [certificationFile, setCertificationFile] = useState(data.productionDetails.certificationFile)
  const navigate = useNavigate()
  const storage = getStorage()
  const certificateRef = ref(storage, uid + '/certification/certificate')
  const { handleSubmit, setError, getValues, formState: { errors }, register, control, clearErrors } = useForm({
    defaultValues: {
      productionSystem: data.productionDetails.productionSystem,
      certification: data.productionDetails.certification,
      certifyingOrganization: data.productionDetails.certifyingOrganization,
    }
  })

  useEffect(() => {
    setPage('Production details')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validateChangePage(newPage) {
    if (certificationFile) {
      changePage(newPage)
      return
    }
    setError("certificationFile", { message: "This field is required" })
  }

  function changePage(newPage) {
    const productionDetails = {
      productionSystem: getValues("productionSystem"),
      certification: getValues("certification"),
      certifyingOrganization: getValues("certification") === certificationOpts[2] ? '' : getValues("certifyingOrganization"),
      certificationFile: getValues("certification") === certificationOpts[0] ? certificationFile : ''
    }

    saveData({productionDetails: productionDetails})
    navigate(newPage)
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
    clearErrors()
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
    <Box 
      sx={{ display:'flex', flexDirection:'column' }} 
      component='form' 
      onSubmit={handleSubmit(() => validateChangePage("/profile/imagery"))}
    >
      <Typography variant="h1_32">Production details</Typography>
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Production system of farm(s)</Typography>
      <Controller
        name="productionSystem"
        control={control}
        rules={{ 
          validate: (v) => {
            if (getValues("productionSystem").length === 0) {
              return "This field is required"
            }
            return true
          }
        }}
        render={({ field }) => (
          <>
            <Select 
              multiple 
              renderValue={Opts => Opts.map((opt) => opt = opt.split(':')[0]).join('; ') }
              {...field}
              onChange={(e) => { field.onChange(e.target.value); console.log(field.value.join("").includes('Aviary'))}}
              error={!!errors.productionSystem}
            >
              {productionSystemOpts.map((productionSystem, i) => (
                <MenuItem key={i} value={productionSystem}>
                  <Checkbox checked={field.value.join("").includes(productionSystem)}/>
                  {productionSystem}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.productionSystem?.message}</FormHelperText>
          </>
        )}
      />
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>
        Do you have cage-free egg certification?
      </Typography>
      <Controller
        name="certification"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <>
            <Select 
              {...field}
              error={!!errors.certification}
              onChange={(e) => field.onChange(e.target.value)}>
              {certificationOpts.map((certificationOpt, i) => (
                <MenuItem key={i} value={certificationOpt}>{certificationOpt}</MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.productionSystem?.message}</FormHelperText>
            <Box sx={{ marginTop:4, display:(getValues("certification") === certificationOpts[0] || getValues("certification") === certificationOpts[1]) ? 'block' : 'none' }}>
              <Typography variant="label">Title of certifying organization</Typography>
              <TextField 
                fullWidth 
                sx={{ marginTop:1 }}
                {...register("certifyingOrganization", { 
                  validate: (v) => { 
                    if (v === "" && (getValues("certification") === certificationOpts[0] || 
                      getValues("certification") === certificationOpts[1])) {
                     return "This field is required" 
                    }
                    return true
                  }
                })}
                error={!!errors.certifyingOrganization}
                helperText={errors.certifyingOrganization?.message}
              />
            </Box>
            {getValues("certification") === certificationOpts[0] && 
              <Box sx={{ marginTop:4 }}>
                <Button 
                  color={!!errors?.certificationFile ? "red" : "grey"}
                  fullWidth 
                  variant='outlined' 
                  onClick={() => fileInputRef.current.click()}
                >
                  <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload certificate 
                </Button>
                <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.certificationFile?.message}</FormHelperText>
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
          </>
        )}
      />
      <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/product-details", nextPage:"/profile/imagery" }}/>
    </Box>
  )
}

export default ProductionDetails