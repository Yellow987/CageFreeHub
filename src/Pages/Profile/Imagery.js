import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Button, FormHelperText, Grid } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Alert, Typography, Paper, AlertTitle } from '@mui/material'
import ImageUploading from "react-images-uploading";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import uuid from 'react-uuid';
import NextBackPage from '../../Components/NextBackPage'
import { useForm } from "react-hook-form";
import { profilependingAdminNotification, updateUserInfo } from '../../firestore'
import { useTranslation } from 'react-i18next'

function Imagery() {
  const { t } = useTranslation(['sellerForm', 'validation'])
  const [setPage, saveData, data, uid] = useOutletContext() // we use uid from outlet as this may be an admin editing a profile
  const [images, setImages] = useState(data.images)
  const [logo, setLogo] = useState(data.logos)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()
  const storage = getStorage()
  const imageFolder = uid + '/images'
  const logoFolder = uid + '/logo'
  const { formState: { errors: imageErrors }, clearErrors, handleSubmit } = useForm({})

  function saveImages(images, storagePath) {
    return new Promise((resolve) => {
      const promises = []
      const uuids = []
      images.forEach((image) => {
        const imageUuid = uuid()
        uuids.push({uuid:imageUuid, data_url:''})
        const imageRef = ref(storage, storagePath + '/' + imageUuid)
        promises.push(uploadBytes(imageRef, image.file).catch(() => { console.log('could not upload') }))
      })
      Promise.allSettled(promises).then(() => {
        resolve(uuids)
      })
    })
  }

  useEffect(() => {
    setPage(t('imagery'))
    
  }, [t, setPage])

  async function getImagesUrl(storagePath, uuids) {
    return new Promise((resolve) => {
      const promises = []
      uuids.forEach((uuid) => {
        const path = storagePath + '/' + uuid.uuid
        promises.push(getDownloadURL(ref(storage, path)))
      })
      Promise.allSettled(promises).then((urls) => {
        urls.forEach((url, i) => {
          uuids[i].data_url = url.value
        })
        resolve(uuids)
      })
    })
  }

  function handleImageUpload(imageList, folder, callStateSet, originalImages, arrImagesName){
    setIsUploading(true)
    saveImages(imageList, folder).then((uuids) => {
      getImagesUrl(folder, uuids).then((uuids) => {
        setIsUploading(false)
        callStateSet([...originalImages, ...uuids])
        saveData({[arrImagesName]: [...originalImages, ...uuids]})
      })
    })
  }

  function handleImageRemove(i, folder, callStateSet, arrImages, arrImagesName) {
    const copy = [...arrImages]
    const deletedImage = copy.splice(i, 1)
    callStateSet([...copy])
    saveData({[arrImagesName]: [...copy]})
    deleteObject(ref(storage, folder + '/' + deletedImage[0].uuid))
  }

  async function changePage(newPage, submit = false) {
    if (!submit) {navigate(newPage)}
    if (data.status === 'rejected' || data.status === 'incomplete') {
      if (!data.claimed) { //unclaimed profiles(which only admins can edit) should always be approved
        await saveData({ status: 'approved' })
      } else {
        profilependingAdminNotification(true, uid)
        await saveData({ status: 'pending' })
        await updateUserInfo(uid, {isProfileComplete: true} )
      }
    }
      
    navigate(newPage)
  }

  return (
    <Box component='form' onSubmit={handleSubmit(() => changePage("/profile/" + uid, true))}>
      <Typography variant="h1_32" >{t('imagery')}</Typography>
      <Alert sx={{  marginTop:4 }} iconMapping={{ success: <AutoAwesomeIcon sx={{ margin:'auto' }}/> }}>
        <Typography variant='p_default' color='#3FAB94'>
          <Box fontWeight='Bold' display="inline">Tip: </Box>{t('to-attract-buyers-we-recommend-you-upload-at-least-3-photos-be-sure-to-include-at-least-one-photo-of-the-barn-that-showcases-the-condition-of-the-animals')}
        </Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>{t('photos-of-farm')}</Typography>
      <ImageUploading 
        multiple 
        maxNumber={6} 
        onChange={(imageList) => {clearErrors(); handleImageUpload(imageList, imageFolder, setImages, images, 'images')}} 
        dataURLKey="data_url" 
        acceptType={["jpg", "png", "jpeg"]} 
        maxFileSize='8000000'
      >
      {({ imageList, onImageUpload, errors }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} >
            <Button 
              color={!!imageErrors?.images ? "red" : "greyDefault"}
              fullWidth 
              variant='outlined' 
              onClick={(onImageUpload)}>
              <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />{t('upload-photos')}
            </Button>
          </Paper>
          <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{imageErrors?.images?.message}</FormHelperText>
          
          <Grid container spacing={2} sx={{ marginTop:0 }}>
            {images.map((image, index) => (
              <Grid item key={index} width={{ xs:'50%', sm:'25%' }}>
                <img src={image.data_url} alt="" width='100%'/>
                <Button color='danger' fullWidth variant='contained' onClick={() => {handleImageRemove(index, imageFolder, setImages, images, 'images')}}>{t('remove')}</Button>
              </Grid>
            ))}
          </Grid>
          {errors && <Alert severity="error" sx={{ marginTop:2 }}><AlertTitle>{t('validation:error')}</AlertTitle>
            {errors.maxNumber && <Typography>{t('validation:you-can-only-have-6-images')}</Typography>}
            {errors.acceptType && <Typography>{t('validation:unsupported-file-type-please-upload-only-png-and-jpg-file-types')}</Typography>}
            {errors.maxFileSize && <Typography>{t('validation:file-size-must-be-under-8mb')}</Typography>}
          </Alert>}
        </Box>
      )}
      </ImageUploading>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>{t('logo-optional')}</Typography>
      <ImageUploading 
        maxNumber={1} 
        value={logo} 
        onChange={(uploadedLogo) => {handleImageUpload(uploadedLogo, logoFolder, setLogo, logo, 'logos')}} 
        dataURLKey="data_url" 
        acceptType={["jpg", "png", "jpeg"]} 
        maxFileSize='8000000'
      >
      {({ imageList, onImageUpload, errors }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} ><Button color='greyDefault' fullWidth variant='outlined' onClick={(onImageUpload)}>
            <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />{t('upload-logo')}
          </Button></Paper>
          {logo.length === 1 && <Box sx={{ marginTop:2, width:'200px' }}>
            <img src={imageList[0].data_url} alt="" width='100%'/>
            <Button color='danger' fullWidth variant='contained' onClick={() => handleImageRemove(0, logoFolder, setLogo, logo, 'logos')}>{t('remove')}</Button>
          </Box>}
          {errors && <Alert severity="error" sx={{ marginTop:2 }}><AlertTitle>{t('validation:error')}</AlertTitle>
            {errors.maxNumber && <Typography>{t('validation:you-can-only-have-one-image')}</Typography>}
            {errors.acceptType && <Typography>{t('validation:unsupported-file-type-please-upload-only-png-and-jpg-file-types')}</Typography>}
            {errors.maxFileSize && <Typography>{t('validation:file-size-must-be-under-8mb')}</Typography>}
          </Alert>}
        </Box>
      )}
      </ImageUploading>
      <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/production-details", nextPage:"/profile/" + uid, submit: true, isUploading: isUploading }}/>
    </Box>
  )
}

export default Imagery