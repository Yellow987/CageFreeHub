import React from 'react'
import { Outlet } from 'react-router'
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useState, useEffect, useCallback  } from 'react';
import { useAuth } from '../AuthContext'
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore'

function ProfileProgressBar() {
  const [page, setPage] = useState('')
  const [goToPage, setGoToPage] = useState('')
  const pages = ["Basics", "Location(s)", "Contact", "Product details", "Production details", "Imagery"]
  const db = getFirestore();
  const { currentUser } = useAuth();
  const docRef = useCallback(() => { return doc(db, "farms", currentUser.uid) }, [db, currentUser.uid])
  const [data, setData] = useState(null)
  const isEqual = require('lodash.isequal');


  async function saveData(values){
    const newData = {
      ...data,
      ...values
    }
    if (!isEqual(data, newData)) {
      await setDoc(docRef(), newData);
      console.log('update values')
    } else {
      console.log(data)
      console.log(newData)
    }
  }

  useEffect(() => {
    onSnapshot(docRef(), (doc) => {
      if (doc.exists()) {
        setData(doc.data())
      } else {
        const initialData = {
          //Meta
          approved: false,

          //Basics
          organizationName: '',
          website: '',

          //locations
          locations: [{city:'',country:''}],

          //Contact
          name: '',
          jobTitle: '',
          contactChannels: {phone: '', whatsapp: '', wechat: ''},

          //Product details
          productDetails: {},

          //Production details
          ProductionDetails: {
            productionSystem: [],
            certification: '',
            certifyingOrganization: '',
            certificationFile: {name: '', url: ''}
          },

          //Imagery
          images: [],
          logos: []

        }
        setDoc(docRef, initialData);
      }
    })
  }, [docRef])

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
        {data && <Outlet context={[setPage, goToPage, setGoToPage, saveData, data]} />}
        <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
          <Button><Typography variant='p_default' onClick={() => { setGoToPage('back') }}>← Back</Typography></Button>
          <Button variant='contained' onClick={() => { setGoToPage('next') }}>{page === 'Imagery' ? "Submit for approval" : "Next →"}</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileProgressBar
