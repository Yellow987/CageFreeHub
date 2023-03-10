import React from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Box, Typography, Divider, Link, Grid, Paper, Button } from '@mui/material';
import AdminApprovalOptions from '../../Components/AdminApprovalOptions';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';                                                                                                               
import Carousel from 'react-material-ui-carousel';
import { useAuth } from '../../AuthContext';
import adminUid from '../../AdminAccountsConfig';
import PrivateRoute from '../../Components/PrivateRoute';
import ProductDetailsDisplay from '../../Components/ProductDetailsDisplay';
import ClaimedPopup from '../../Components/ClaimedPopup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { getFarm } from '../../firestore';
import { SellerData } from './../../firestore';

function Profile() {
  const { id } = useParams()
  const [data, setData] = useState<SellerData>()
  const [IsImagePreloaded, setIsImagePreloaded] = useState(false)
  const { currentUser } = useAuth();
  const colorMap = { approved:'primary.main', pending:'#CDA957', rejected:'red.main' }
  const approvalStatusTextMap: Record<string, string> = {
    approved: "Your profile is now live for buyers to view!",
    pending: "You will receive an email when your profile is approved (this will take 48 business hours at most)",
    rejected: "Please check your email for details about how to fix your profile in order for the profile to be visible to buyers!"
  }

  useEffect(() => {
    if (!id) return
    getFarm(id).then((farm: SellerData) => {
      setData(farm)
      if (farm.images.length >= 1) {
        preloadImage(farm.images[0].data_url).then(() => {
          setIsImagePreloaded(true)
        })
      }
    })
  }, [currentUser, id])

  function preloadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function() {
        resolve(img)
      }
      img.onerror = img.onabort = function() {
        reject(src)
      }
      img.src = src
    })
  }
  
  return (
    <PrivateRoute props={{ allowBuyers: true, allowUid:id, BuyerNeedsApprovalToSeeSellers:true }}>
      {data && 
      <Box mx='24px' sx={{ marginTop:'56px'}}>
        <AdminApprovalOptions props={{ data:data, id:id, isSeller:true }}/>
        
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={6}>
            {currentUser && (currentUser.uid === id || currentUser.uid === adminUid) && <Box>
              <Typography variant='label'>Approval status</Typography>
              <Typography 
                variant='h2' 
                color={colorMap[data.status as keyof typeof colorMap]}
                marginTop={1} 
                marginBottom={1}
                display="flex"
                alignItems='center' 
              >
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                <CheckCircleOutlineIcon sx={{ marginLeft:1, display:data.status === 'approved' ? 'block' : 'none' }} fontSize='large'/>
              </Typography>
              <Typography variant='p_default'>{approvalStatusTextMap[data.status]}</Typography>
              <Divider light style={{ marginTop:'48px' }}/>
            </Box>}
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={12} md={6}>
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'54px', marginTop:'48px', alignItems:'center'}}>
              <Box sx={{ display:"flex", flexDirection:'row', alignItems:"center" }}>
                <Typography variant="h1_32" >{data.organizationName}</Typography>
                <ClaimedPopup props={{ isClaimed: data.claimed }} />
              </Box>
              {data.logos.length === 1 && 
                <Box component='img' src={data.logos[0].data_url}  sx={{width:{md:'48px', xs:"0px" }, height:{md:'48px', xs:"0px" } }} alt="" />
              }
            </Box>
          </Grid>
          <Grid item xs={4} />
        </Grid>
        
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={6}>
            <Typography variant="label" sx={{marginBottom:'16px'}}>Distribution country (countries)</Typography>
            {data.distributionCountries.map((country, index)=>{
              return( <Typography variant='p_large_dark' sx={{marginTop:'16px'}} key={index}>{country.label}</Typography> )
            })}
            <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Farm location(s)</Typography>
            {data.locations.map((location, index)=>{
              return( <Typography variant='p_large_dark' sx={{marginTop:'16px'}} key={index}>{location.city + ', ' + location.country.label}</Typography> )
            })}
                        
            <Divider light style={{ marginTop:'48px', marginBottom:'48px' }}/>

            <ProductDetailsDisplay props={{ productDetails:data.productDetails }} />

            <Divider light style={{ marginTop:'48px' }}/>

            <Box>
              <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Website</Typography>
              <Link href={data.website} sx={{display:'block'}}>{data.website}</Link>
                
              <Divider light style={{ marginTop:'48px' }}/>
              
              <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Production system of farm(s)</Typography>
              {data.productionDetails.productionSystem.map((system, index)=>{
                return( <Typography variant='p_large_dark' sx={{marginTop:'16px'}} key={index}>{system}</Typography> )
              })}
              <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Certification </Typography>
              <Box sx={{ marginTop:'16px', marginBottom:'48px', display:'flex', alignItems:'center' }}>
                <Typography variant='p_large_dark' sx={{ marginRight:'8px' }}>{data.productionDetails.certifyingOrganization}</Typography>
                {<Link href={data.productionDetails.certificationFile.url} target='_blank' rel='noopener noreferrer' sx={{ display:'flex', alignItems:'center' }}>
                  <VisibilityOutlinedIcon fontSize='small' color='primary'/> 
                </Link>}
              </Box>

              {IsImagePreloaded && <Carousel
                autoPlay={false} 
                sx={{ 
                  marginBottom:'80px',
                  width:'100%',
                  height:'100%'
                }} 
                navButtonsAlwaysVisible={true}
              >
                {
                  data.images.map((image, index) => { 
                    return( 
                      <img style={{ width:'100%', height:'100%' }} key={index} src={image.data_url} alt=""/> 
                    )
                  })
                }
              </Carousel>}
            </Box>
          </Grid>
          
          <Grid item xs={0} md={1} />

          <Grid item md={3} xs={12} order={{xs:-1, md:3}} marginBottom='24px'>
            <Paper elevation={3} style={{ padding:'24px'}}>
              <Typography variant="label" sx={{marginBottom:'16px'}}>Contact {data.organizationName}</Typography>
              {data.contactChannels.email && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through Email</Typography>
              <Link href={'mailto:' + data.contactChannels.email} sx={{display:'block'}}>{data.contactChannels.email}</Link></>)}

              {data.contactChannels.phone && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through Phone</Typography>
              <Link href={'tel:' + data.contactChannels.phone} sx={{display:'block'}}>{formatPhoneNumberIntl('+' + data.contactChannels.phone)}</Link></>)}

              {data.contactChannels.wechat && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through WeChat</Typography>
              <Link href={'weixin://dl/chat?' + data.contactChannels.wechat} sx={{display:'block'}}>{data.contactChannels.wechat}</Link></>)}

              {data.contactChannels.whatsapp && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through WhatsApp</Typography>
              <Link href={'whatsapp://send?phone=' + data.contactChannels.whatsapp} sx={{display:'block'}}>{formatPhoneNumberIntl('+' + data.contactChannels.whatsapp)}</Link></>)}
              <Button onClick={() => console.log(data)}>wrof</Button>
            </Paper>
          </Grid>

        </Grid>
      </Box>}
    </PrivateRoute>
  )
}

export default Profile