import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Box, Button, Grid, ImageList } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Typography, Paper } from '@mui/material'
import ImageUploading from "react-images-uploading";

function Imagery() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const [images, setImages] = useState([])
  const navigate = useNavigate()

  const onImageUploadChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

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
      <Typography variant='p_default_bold' sx={{ marginTop:4 }} maxNumber='4' >Photos of farm</Typography>
      <ImageUploading multiple value={images} onChange={onImageUploadChange} dataURLKey="data_url" acceptType={["jpg"]}>
      {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
        <Box>
          <Paper sx={{ marginTop:1 }} ><Button color='grey' fullWidth variant='outlined' onClick={onImageUpload}>
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
        </Box>
      )}
      </ImageUploading>
      <Typography variant='p_default_bold' sx={{ marginTop:4 }}>Logo (optional)</Typography>
      <Paper sx={{ marginTop:1 }} ><Button color='grey' fullWidth variant='outlined'><ImageOutlinedIcon fontSize='small' sx={{ stroke: "#ffffff" }} />Upload logo</Button></Paper>
    </Box>
  )
}

export default Imagery