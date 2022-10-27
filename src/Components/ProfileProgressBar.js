import React from 'react'
import { Outlet } from 'react-router'
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../AuthContext'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

function ProfileProgressBar() {
  const [page, setPage] = useState('')
  const [goToPage, setGoToPage] = useState('')
  const formValues = {
    companyName: useState(''), 
    website: useState(''),
    approved: false,
    certifyingbody: useState(''),
    city: useState(''),
    countryName: useState(''),
    distributioncountry:useState([]),
    location: useState([
      {'city':'', 'country':''}
    ]),
    eggform:useState(''),
    eggtypes: useState(''),
    email: useState(''),
    fullname: useState(''),
    jobtitle: useState(''),
    phonenumber: useState(''),
    productionsystem: useState(''),
    certificationstatus: useState(''),
  }

  
  const pages = ["Basics", "Location(s)", "Contact", "Product details", "Production details", "Imagery"]
  const db = getFirestore();
  const { currentUser } = useAuth();
  async function sendData(){
      let data = {
              approved: false,
              certifyingbody: formValues.certifyingbody[0],
              city: formValues.city[0],
              companyName: formValues.companyName[0],
              countryName: formValues.countryName[0],
              distributioncountry: formValues.distributioncountry[0],
              location: formValues.location[0],
              eggform: formValues.eggform[0],
              eggtypes: formValues.eggtypes[0],
              email: formValues.email[0],
              fullname: formValues.fullname[0],
              jobtitle: formValues.jobtitle[0],
              phonenumber: formValues.phonenumber[0],
              productionsystem: formValues.productionsystem[0],
              website: formValues.website[0],
              certificationstatus: formValues.certificationstatus[0]
          }
      await setDoc(doc(db, "farms", currentUser.uid), data);
  }


  return (
    <Box align='center' mx={{ sm:'10%', xs:'24px' }} sx={{ marginTop:6 }}>
      <Box sx={{ display:'flex', flexDirection:'row', justifyContent: 'center' }} >
        {pages.map((pageName) => (
          <Box key={pageName} sx={{ width:'16.66%', marginRight:'2px' }}>
            <LinearProgress variant='determinate' value={0} sx={{height:'8px', borderRadius:'10px', backgroundColor:page === pageName ? 'primary' : '#DFE3E9' }}/>
            <Typography display={{ sm:'block', xs:'none'}} align='left' variant='p_default' sx={{ marginTop:1 }}>{pageName}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop:6, maxWidth:'400px', textAlign:'left', marginBottom:2 }}>
        <Outlet context={[setPage, goToPage, setGoToPage, formValues]} /> 
        <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
          <Button><Typography variant='p_default' onClick={() => {setGoToPage('back')}}>← Back</Typography></Button>
          <Button variant='contained' onClick={() => { setGoToPage('next'); sendData()}}>{page === 'Imagery' ? "Submit for approval" : "Next →"}</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileProgressBar
