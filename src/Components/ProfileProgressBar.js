import React from 'react'
import { Outlet } from 'react-router'
import { Box, LinearProgress, Typography } from '@mui/material';
import { useState, useEffect, useCallback  } from 'react';
import { useAuth } from '../AuthContext'
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore'
import adminUid from '../AdminAccountsConfig'

function ProfileProgressBar() {
  const [page, setPage] = useState('')
  const pages = ["Basics", "Location(s)", "Contact", "Product details", "Production details", "Imagery"]
  const db = getFirestore();
  const { currentUser } = useAuth();
  const uid = currentUser.uid === adminUid ? JSON.parse(localStorage.getItem('uidToEdit')) : currentUser.uid
  const docRef = useCallback(() => { return doc(db, "farms", uid) }, [db, uid])
  const [data, setData] = useState(null)
  const isEqual = require('lodash.isequal');

  async function saveData(values){
    const newData = {
      ...data,
      ...values,
    }
    if (!isEqual(data, newData)) {
      await setDoc(docRef(), newData);
    }
  }

  useEffect(() => {
    onSnapshot(docRef(), (doc) => {
      if (doc.exists()) {
        setData(doc.data())
      } else {
        console.log('create')
        const utcDate = new Date()
        const initialData = {
          //Meta
          status: 'incomplete',
          adminLastStatusUpdate: utcDate,
          creationDate: utcDate,
          claimed: adminUid === currentUser.uid ? false : true,

          //Basics
          organizationName: '',
          website: '',

          //locations
          locations: [{city:'',country:''}],
          distributionCountries: [],

          //Contact
          name: '',
          jobTitle: '',
          contactChannels: {phone: '', whatsapp: '', wechat: ''},

          //Product details
          productDetails: {},

          //Production details
          productionDetails: {
            productionSystem: [],
            certification: '',
            certifyingOrganization: '',
            certificationFile: {name: '', url: ''}
          },

          //Imagery
          images: [],
          logos: []

        }
        setDoc(docRef(), initialData)
      }
    })
  }, [docRef, currentUser])

  return (
    <Box align='center' mx={{ sm:'10%', xs:'24px' }} sx={{ marginTop:6 }}>
      {currentUser.uid === adminUid && <Typography variant='h1'>ADMIN IS EDITING {uid}</Typography>}
      <Box sx={{ display:'flex', flexDirection:'row', justifyContent: 'center' }} >
        {pages.map((pageName) => (
          <Box key={pageName} sx={{ width:'16.66%', marginRight:'2px' }}>
            <LinearProgress variant='determinate' value={0} sx={{height:'8px', borderRadius:'10px', backgroundColor:page === pageName ? 'primary' : '#DFE3E9' }}/>
            <Typography display={{ sm:'block', xs:'none'}} align='left' variant='p_default' sx={{ marginTop:1 }}>{pageName}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop:6, maxWidth:'400px', textAlign:'left', marginBottom:2 }}>
        { data && <Outlet context={[setPage, saveData, data, uid]} />}
      </Box>
    </Box>
  )
}

export default ProfileProgressBar
