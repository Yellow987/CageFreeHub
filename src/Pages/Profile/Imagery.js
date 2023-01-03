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
import { updateUserInfo } from '../../firestore'
import { getUserInfo } from '../../firestore'

function Imagery() {
  const [setPage, saveData, data, uid] = useOutletContext() // we use uid from outlet as this may be an admin editing a profile
  const [images, setImages] = useState(data.images)
  const [logo, setLogo] = useState(data.logos)
  const navigate = useNavigate()
  const storage = getStorage()
  const imageFolder = uid + '/images'
  const logoFolder = uid + '/logo'
  const { setError, formState: { errors: imageErrors }, clearErrors, handleSubmit } = useForm({})

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
    setPage('Imagery')
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    saveImages(imageList, folder).then((uuids) => {
      getImagesUrl(folder, uuids).then((uuids) => {
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

  function validateChangePage(newPage) {
    if (images.length < 3) {
      setError("images", {message: "Please upload at least 3 images"})
      console.log(imageErrors)
      return
    }
    changePage(newPage)
  }

  function changePage(newPage) {
    if (data.claimed) {
      updateUserInfo(uid, {isProfileComplete: true} )
    }
    if (data.status === 'rejected' || data.status === 'incomplete') {
      if (!data.claimed) { //unclaimed profiles(which only admins can edit) should always be approved
        saveData({ status: 'approved' })
      } else {
        saveData({ status: 'pending' })
      }
    } else {
      navigate(newPage)
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit(() => validateChangePage("/profile/" + uid))}>
      <Button onClick={() => console.log(imageErrors)}>riytfundluy</Button>
      <Typography variant="h1_32" >Imagery</Typography>
      <Alert sx={{  marginTop:4 }} iconMapping={{ success: <AutoAwesomeIcon sx={{ margin:'auto' }}/> }}>
        <Typography variant='p_default' color='#3FAB94'>
          <Box fontWeight='Bold' display="inline">Tip: </Box>To attract buyers, we recommend you upload at least 3 photos. Be sure to include at least one photo of the barn that showcases the condition of the animals.
        </Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Photos of farm</Typography>
      <ImageUploading multiple maxNumber={6} onChange={(imageList) => {clearErrors(); handleImageUpload(imageList, imageFolder, setImages, images, 'images')}} dataURLKey="data_url" acceptType={["jpg", "png", "jpeg"]} maxFileSize='8000000'>
      {({ imageList, onImageUpload, errors }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} >
            <Button 
              color={!!imageErrors?.images ? "red" : "grey"}
              fullWidth 
              variant='outlined' 
              onClick={(onImageUpload)}>
              <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload photos
            </Button>
          </Paper>
          <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{imageErrors?.images?.message}</FormHelperText>
          
          <Grid container spacing={2} sx={{ marginTop:0 }}>
            {images.map((image, index) => (
              <Grid item key={index} width={{ xs:'50%', sm:'25%' }}>
                <img src={image.data_url} alt="" width='100%'/>
                <Button color='danger' fullWidth variant='contained' onClick={() => {handleImageRemove(index, imageFolder, setImages, images, 'images')}}>Remove</Button>
              </Grid>
            ))}
          </Grid>
          {errors && <Alert severity="error" sx={{ marginTop:2 }}><AlertTitle>Error</AlertTitle>
            {errors.maxNumber && <Typography>You can only have 6 images</Typography>}
            {errors.acceptType && <Typography>Unsupported file type. Please upload only .png and .jpg file types</Typography>}
            {errors.maxFileSize && <Typography>File size must be under 8MB</Typography>}
          </Alert>}
        </Box>
      )}
      </ImageUploading>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Logo (optional)</Typography>
      <ImageUploading maxNumber={1} value={logo} onChange={(uploadedLogo) => {handleImageUpload(uploadedLogo, logoFolder, setLogo, logo, 'logos')}} dataURLKey="data_url" acceptType={["jpg", "png", "jpeg"]} maxFileSize='8000000'>
      {({ imageList, onImageUpload, errors }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} ><Button color='grey' fullWidth variant='outlined' onClick={(onImageUpload)}>
            <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload Logo
          </Button></Paper>
          {logo.length === 1 && <Box sx={{ marginTop:2, width:'200px' }}>
            <img src={imageList[0].data_url} alt="" width='100%'/>
            <Button color='danger' fullWidth variant='contained' onClick={() => handleImageRemove(0, logoFolder, setLogo, logo, 'logos')}>Remove</Button>
          </Box>}
          {errors && <Alert severity="error" sx={{ marginTop:2 }}><AlertTitle>Error</AlertTitle>
            {errors.maxNumber && <Typography>You can only have 6 images</Typography>}
            {errors.acceptType && <Typography>Unsupported file type. Please upload only .png and .jpg file types</Typography>}
            {errors.maxFileSize && <Typography>File size must be under 8MB</Typography>}
          </Alert>}
        </Box>
      )}
      </ImageUploading>
      <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/production-details", nextPage:"/profile/" + uid, submit: true }}/>
    </Box>
  )
}

export default Imagery