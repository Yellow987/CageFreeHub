import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Select, Typography, MenuItem, TextField, Button, Link,FormHelperText, Checkbox } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm, Controller } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage'
import { useTranslation } from 'react-i18next'

function ProductionDetails() {
  const { t } = useTranslation(['sellerForm', 'validation'])
  const [setPage, saveData, data, uid] = useOutletContext()
  const fileInputRef = useRef();
  const [certificationFile, setCertificationFile] = useState(data.productionDetails.certificationFile)
  const navigate = useNavigate()
  const storage = getStorage()
  const certificateRef = ref(storage, uid + '/certification/certificate')
  const [isUploading, setIsUploading] = useState(false)
  const { handleSubmit, setError, getValues, formState: { errors }, register, control, clearErrors } = useForm({
    defaultValues: {
      productionSystem: data.productionDetails.productionSystem,
      certification: data.productionDetails.certification,
      certifyingOrganization: data.productionDetails.certifyingOrganization,
    }
  })

  useEffect(() => {
    setPage(t('production-details'))

  }, [t, setPage])

  function validateChangePage(newPage) {
    if (!certificationFile && getValues('certification') === 'Yes, we are certified') {
      setError("certificationFile", { message: t('validation:this-field-is-required') })
    }
    changePage(newPage)
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
  const certificationOrganizationOptsI18n = {
    'Yes, we are certified': t('yes-we-are-certified'),
    'We are in the process of certification': t('we-are-in-the-process-of-certification'),
    'No, we are not (in the process of becoming) certified': t('no-we-are-not-certified-or-in-the-process-of-becoming-certified')
  }
  const productionSystemOpts = [
    'Aviary: multi-level cage-free system',
    'Barn: single-level cage-free system',
    'Fixed housing: structure does not move',
    'Free-range: cage-free system that provides outdoor access',
    'Mobile unit: house or structure on wheels',
  ]
  const productionSystemOptsI18n = {
    'Aviary: multi-level cage-free system': t('aviary')  + ': ' + t('multi-level-cage-free-system'),
    'Barn: single-level cage-free system': t('barn') + ': ' + t('single-level-cage-free-system'),
    'Fixed housing: structure does not move': t('fixed-housing') + ': ' + t('structure-does-not-move'),
    'Free-range: cage-free system that provides outdoor access': t('freerange') + ': ' + t('cage-free-system-that-provides-outdoor-access'),
    'Mobile unit: house or structure on wheels': t('mobile-unit') + ': ' + t('house-or-structure-on-wheels')
  }
  const productionSystemOptsI18nShort = {
    'Aviary: multi-level cage-free system': t('aviary'),
    'Barn: single-level cage-free system': t('barn'),
    'Fixed housing: structure does not move': t('fixed-housing'),
    'Free-range: cage-free system that provides outdoor access': t('freerange'),
    'Mobile unit: house or structure on wheels': t('mobile-unit')
  }

  function handleFileUpload(e) {
    e.preventDefault()
    clearErrors()
    const certification = e.target.files[0]
    if (!certification) {
      return
    }

    setIsUploading(true)
    uploadBytes(certificateRef, certification).then(() => {
      getDownloadURL(certificateRef).then((url) => {
        setCertificationFile({name: e.target.files[0].name, url: url})
        setIsUploading(false)
      })
    })
  }
  
  return (
    <Box 
      sx={{ display:'flex', flexDirection:'column' }} 
      component='form' 
      onSubmit={handleSubmit(() => validateChangePage("/profile/imagery"))}
    >
      <Typography variant="h1_32">{t('production-details')}</Typography>
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>{t('production-system-of-farm-s')}</Typography>
      <Controller
        name="productionSystem"
        control={control}
        rules={{ 
          validate: (v) => {
            if (getValues("productionSystem").length === 0) {
              return t('validation:this-field-is-required')
            }
            return true
          }
        }}
        render={({ field }) => (
          <>
            <Select 
              multiple 
              renderValue={Opts => Opts.map((opt) => opt = productionSystemOptsI18nShort[opt]).join('; ') }
              {...field}
              onChange={(e) => { field.onChange(e.target.value); console.log(field.value.join("").includes('Aviary'))}}
              error={!!errors.productionSystem}
            >
              {productionSystemOpts.map((productionSystem, i) => (
                <MenuItem key={i} value={productionSystem}>
                  <Checkbox checked={field.value.join("").includes(productionSystem)}/>
                  {productionSystemOptsI18n[productionSystem]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.productionSystem?.message}</FormHelperText>
          </>
        )}
      />
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>
        {t('do-you-have-cage-free-egg-certification')} </Typography>
      <Controller
        name="certification"
        control={control}
        rules={{ required: t('validation:this-field-is-required') }}
        render={({ field }) => (
          <>
            <Select 
              {...field}
              error={!!errors.certification}
              onChange={(e) => { field.onChange(e.target.value); clearErrors() }}>
              {certificationOpts.map((certificationOpt, i) => (
                <MenuItem key={i} value={certificationOpt}>{certificationOrganizationOptsI18n[certificationOpt]}</MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.productionSystem?.message}</FormHelperText>
            <Box sx={{ marginTop:4, display:(getValues("certification") === certificationOpts[0] || getValues("certification") === certificationOpts[1]) ? 'block' : 'none' }}>
              <Typography variant="label">{t('title-of-certifying-organization')}</Typography>
              <TextField 
                fullWidth 
                sx={{ marginTop:1 }}
                {...register("certifyingOrganization", { 
                  validate: (v) => { 
                    if (v === "" && (getValues("certification") === certificationOpts[0] || 
                      getValues("certification") === certificationOpts[1])) {
                     return t('validation:this-field-is-required') 
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
                  color={!!errors?.certificationFile ? "red" : "greyDefault"}
                  fullWidth 
                  variant='outlined' 
                  onClick={() => fileInputRef.current.click()}
                >
                  <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />{t('upload-certificate')} 
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
      <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/product-details", nextPage:"/profile/imagery", isUploading: isUploading }}/>
    </Box>
  )
}

export default ProductionDetails