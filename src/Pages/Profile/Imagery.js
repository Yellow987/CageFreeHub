import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Button, Grid } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Alert, Typography, Paper, AlertTitle } from '@mui/material'
import ImageUploading from "react-images-uploading";
import { getStorage, ref, uploadBytes, deleteObject, listAll } from "firebase/storage";
import { useAuth } from './../../AuthContext';

function Imagery() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const [images, setImages] = useState([])
  const [logo, setLogo] = useState([])
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  function handleSaveImages() {
    const storage = getStorage()
    deleteImages(storage).then(() => {
      uploadImagesToFirebase(storage)
    })
    replaceLogo(storage)
  }

  function uploadImagesToFirebase(storage) {
    for (const [i, image] of images.entries()) {
      const imageRef = ref(storage, currentUser.uid + '/images/' + i.toString())
      uploadBytes(imageRef, image.file).catch((error) => { console.log('could not upload') })
    }
  }

  function replaceLogo(storage) {
    const logoRef = ref(storage, currentUser.uid + '/logo/logo')
    deleteObject(logoRef).then(() => {
      if (logo.length !== 0) {
        uploadBytes(logoRef, logo[0].file).catch((error) => { console.log('could not upload logo') })
      }  
    }).catch(() => {
      if (logo.length !== 0) {
        uploadBytes(logoRef, logo[0].file).catch((error) => { console.log('could not upload logo') })
      }  
    })
  }

  async function deleteImages(storage) {
    return new Promise((resolve, reject) => {
      const listRef = ref(storage, currentUser.uid + '/images')
      listAll(listRef).then((res) => {
        if (res.items.length === 0) {resolve()}
        res.items.forEach((itemRef) => {
          let deleteImages = 0
          const deleteRef = ref(storage, itemRef._location.path_)
          deleteObject(deleteRef).then(() => {
            deleteImages += 1
            if (deleteImages === res.items.length) {resolve()}
          }).catch((error) => {
            console.log('err deleting')
            reject()
          })
        })
      })
    })
  }

  useEffect(() => {
    setPage('Imagery')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveData() {
    
  }

  useEffect(() => {
    if (goToPage === '') {return}
    saveData()  
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/production-details')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  return (
    <Box>
      <Typography variant="h1_32" >Imagery</Typography>
      <Alert sx={{  marginTop:4 }} iconMapping={{ success: <AutoAwesomeIcon sx={{ margin:'auto' }}/> }}>
        <Typography variant='p_default' color='#3FAB94'>
          <Box fontWeight='Bold' display="inline">Tip: </Box>To attract buyers, we recommend you upload at least 3 photos. Be sure to include at least one photo of the barn that showcases the condition of the animals.
        </Typography>
      </Alert>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Photos of farm</Typography>
      <ImageUploading multiple maxNumber={4} value={images} onChange={(imageList) => {setImages(imageList);}} dataURLKey="data_url" acceptType={["jpg", "png"]} maxFileSize='8000000'>
      {({ imageList, onImageUpload, onImageRemove, errors }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} ><Button color='grey' fullWidth variant='outlined' onClick={(onImageUpload)}>
            <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload photos
          </Button></Paper>
          
          <Grid container spacing={2} sx={{ marginTop:0 }}>
            {imageList.map((image, index) => (
              <Grid item key={index} width={{ xs:'50%', sm:'25%' }}>
                <img src={image.data_url} alt="" width='100%'/>
                <Button color='danger' fullWidth variant='contained' onClick={() => onImageRemove(index)}>Remove</Button>
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
      <ImageUploading maxNumber={4} value={logo} onChange={(uploadedLogo) => {setLogo(uploadedLogo)}} dataURLKey="data_url" acceptType={["jpg", "png"]} maxFileSize='8000000'>
      {({ imageList, onImageUpload, onImageRemove, errors }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} ><Button color='grey' fullWidth variant='outlined' onClick={(onImageUpload)}>
            <ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload Logo
          </Button></Paper>
          {imageList.length === 1 && <Box sx={{ marginTop:2, width:'200px' }}>
            <img src={imageList[0].data_url} alt="" width='100%'/>
            <Button color='danger' fullWidth variant='contained' onClick={() => onImageRemove(0)}>Remove</Button>
          </Box>}
          {errors && <Alert severity="error" sx={{ marginTop:2 }}><AlertTitle>Error</AlertTitle>
            {errors.maxNumber && <Typography>You can only have 6 images</Typography>}
            {errors.acceptType && <Typography>Unsupported file type. Please upload only .png and .jpg file types</Typography>}
            {errors.maxFileSize && <Typography>File size must be under 8MB</Typography>}
          </Alert>}
        </Box>
      )}
      </ImageUploading>
      <Button onClick={() => {handleSaveImages()}}>save</Button>
    </Box>
  )
}

export default Imagery