import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import { Box, Typography, Divider, Link, Grid, Paper } from '@mui/material';
import AdminApprovalOptions from '../../Components/AdminApprovalOptions';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Carousel from 'react-material-ui-carousel';
import { useAuth } from '../../AuthContext';
import adminUid from './../../AdminAccountsConfig';
import PrivateRoute from './../../Components/PrivateRoute';

function Profile() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const db = getFirestore()
  const docRef = useCallback(() => { return doc(db, "farms", id) }, [db, id])
  const { currentUser } = useAuth();

  useEffect(() => {
    getDoc(docRef()).then((doc) => {
      setData(doc.data())
    })
  }, [docRef])
  return (
    <PrivateRoute props={{ allowBuyers: true, allowUid:id }}>
      {data && <Box mx='24px' sx={{ marginTop:'56px'}}>
        <AdminApprovalOptions props={{ data:data, docRef:docRef() }}/>
        
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={6}>
            {currentUser && (currentUser.uid === id || currentUser.uid === adminUid) && <Box>
              <Typography variant='label'>Approval status</Typography>
              <Typography variant='h2' color='#CDA957' marginTop={1} marginBottom={1}>{data.status.charAt(0).toUpperCase() + data.status.slice(1)}</Typography>
              <Typography variant='p_default'>You will receive an email when your profile is approved (this will take 48 business hours at most)</Typography>
              <Divider light style={{ marginTop:'48px' }}/>
            </Box>}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'54px', marginTop:'48px', alignItems:'center'}}>
              <Typography variant="h1_32" >{data.organizationName}</Typography>
              {data.logos.length === 1 && <img src={data.logos[0].data_url}  style={{width:'30px', height:'30px'}} alt="" />}
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={6}>
            <Typography variant="label" sx={{marginBottom:'16px'}}>Distribution country (countries)</Typography>
            {data.distributionCountries.map((country, index)=>{
              return( <Typography variant='p_large_dark' sx={{marginTop:'16px'}} key={index}>{country}</Typography> )
            })}
            <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Farm location(s)</Typography>
            {data.locations.map((location, index)=>{
              return( <Typography variant='p_large_dark' sx={{marginTop:'16px'}} key={index}>{location.city+', '+ location.country}</Typography> )
            })}
                        
            <Divider light style={{ marginTop:'48px' }}/>
            <Box display='flex' flexDirection='column' marginTop='48px'>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="label">Cage-free egg type</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="label" >Production capacity (year) / Price</Typography>
                </Grid>
              </Grid>
                {Object.keys(data.productDetails).map((productDetail) => {return(
                  <Grid container spacing={2} key={productDetail} marginTop='8px'>
                    <Grid item xs={4}>
                      {productDetail}
                    </Grid>
                    <Grid item xs={8}>
                      {data.productDetails[productDetail].capacity + ' ' + data.productDetails[productDetail].unit + ' / ' + data.productDetails[productDetail].price + ' ' + data.productDetails[productDetail].currency }
                    </Grid>
                  </Grid>)
                })}
              </Box>
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
                <Carousel height='500px' autoPlay={false} sx={{ marginBottom:'80px'}} navButtonsAlwaysVisible={true}	>
                {data.images.map((image, index)=>{
                  return( <img width='100%' key={index} src={image.data_url} alt=""/> )
                })}
                </Carousel>
              </Box>
            </Grid>
            <Grid item xs={0} md={1} />
            <Grid item md={3} xs={12} order={{xs:-1, md:3}} marginBottom='24px'>
              <Paper elevation={3} style={{ padding:'24px'}}>
                <Typography variant="label" sx={{marginBottom:'16px'}}>Contact {data.organizationName}</Typography>
                {data.contactChannels.phone && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through the Phone</Typography>
                <Link href={'tel:' + data.contactChannels.phone} sx={{display:'block'}}>{data.contactChannels.phone}</Link></>)}

                {data.contactChannels.wechat && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through WeChat</Typography>
                <Link href={'tel:' + data.contactChannels.wechat} sx={{display:'block'}}>{data.contactChannels.wechat}</Link></>)}

                {data.contactChannels.whatsapp && (<><Typography variant="p_large_dark" sx={{marginTop:'16px'}}>Message {data.name} through WhatsApp</Typography>
                <Link href={'tel:' + data.contactChannels.whatsapp} sx={{display:'block'}}>{data.contactChannels.whatsapp}</Link></>)}
              </Paper>
          </Grid>
          </Grid>
      </Box>}

    </PrivateRoute>
  )
}

export default Profile