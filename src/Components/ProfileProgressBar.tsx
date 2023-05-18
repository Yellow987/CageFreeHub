import React from 'react'
import { Outlet } from 'react-router'
import { Box, LinearProgress, Typography } from '@mui/material';
import { useState, useEffect, useCallback  } from 'react';
import { useAuth } from '../AuthContext'
import { getFirestore, doc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { isAdmin } from '../AdminAccountsConfig';
import { SellerData } from './../firestore';
import { useTranslation } from 'react-i18next';

function ProfileProgressBar() {
  const { t } = useTranslation(['sellerForm'])
  const [page, setPage] = useState('')
  const pages = [t('basics'), t('locations'), t('contact'), t('product-details'), t('production-details'), t('imagery')]
  const db = getFirestore();
  const { currentUser } = useAuth();
  const uid = isAdmin(currentUser.uid) ? JSON.parse(localStorage.getItem('uidToEdit') ?? '') : currentUser.uid
  const docRef = useCallback(() => { return doc(db, "farms", uid) }, [db, uid])
  const [data, setData] = useState<SellerData | null>(null)
  const isEqual = require('lodash.isequal');

  async function saveData(values: object){
    const newData = {
      ...values,
    }
    if (!isEqual(data, newData)) {
      await updateDoc(docRef(), newData);
    }
  }

  useEffect(() => {
    onSnapshot(docRef(), (doc) => {
      if (doc.exists()) {
        setData(doc.data() as SellerData)
      } else {
        const utcDate = new Date()
        const initialData: SellerData = {
          //Meta
          status: 'incomplete',
          adminLastStatusUpdate: utcDate,
          creationDate: utcDate,
          claimed: isAdmin(currentUser.uid) ? false : true, //if admin touches ID that doesn't exist, it is a skeleton account

          //Basics
          organizationName: '',
          website: '',

          //locations
          locations: [{city:'', country: {label: '', value: ''}}],
          distributionCountries: [],

          //Contact
          name: '',
          jobTitle: '',
          contactChannels: {phone: '', whatsapp: '', wechat: ''},

          //Product details
          productDetails: {},
          maxObjectiveCapacity: 0,

          //Production details
          productionDetails: {
            productionSystem: [],
            certification: '',
            certifyingOrganization: '',
            certificationFile: {name:'', url:''},
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
    <Box mx={{ sm:'10%', xs:'24px' }} sx={{ marginTop:6 }}>
      {isAdmin(currentUser.uid) && <Typography variant='h1'>ADMIN IS EDITING {uid}</Typography>}
      <Box sx={{ display:'flex', flexDirection:'row', justifyContent: 'center' }} >
        {pages.map((pageName) => (
          <Box key={pageName} sx={{ width:'16.66%', marginRight:'2px' }}>
            <LinearProgress variant='determinate' value={0} sx={{height:'8px', borderRadius:'10px', backgroundColor:page === pageName ? 'primary' : '#DFE3E9' }}/>
            <Typography display={{ sm:'block', xs:'none'}} align='left' variant='p_default' sx={{ marginTop:1 }}>{pageName}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop:6, maxWidth:'400px', textAlign:'left', marginBottom:2, marginLeft:'auto', marginRight:'auto' }}>
        { data && <Outlet context={[setPage, saveData, data, uid]} />}
      </Box>
    </Box>
  )
}

export default ProfileProgressBar
