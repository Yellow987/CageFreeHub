import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import { Box, Typography,  Divider, Link, Grid, Paper } from '@mui/material';
import AdminApprovalOptions from '../../Components/AdminApprovalOptions';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Carousel from 'react-material-ui-carousel';

function Profile() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const db = getFirestore()
  const docRef = useCallback(() => { return doc(db, "farms", id) }, [db, id])

  useEffect(() => {
    getDoc(docRef()).then((doc) => {
      setData(doc.data())
    })
  }, [docRef])
  return (
    <>
      {data && <Box mx='24px' sx={{ marginTop:'56px'}}>
        <AdminApprovalOptions props={{ data:data, docRef:docRef() }}/>
        <Box sx={{ background:'#F5F7F8', padding:2 }}>
          <Typography variant='p_large_dark' fontWeight='bold'>Awaiting approval</Typography>
          <Typography variant='p_large_dark'>
            <br/>Our team is reviewing your profile for approval <br/><br/>
            We’ll send a text to the provided number once the profile is approved<br/><br/>
            This will take 72 hours at most
          </Typography>
        </Box>

        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={6}>
            <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'54px', marginTop:'48px', alignItems:'center'}}>
              <Typography variant="h1_32" >{data.organizationName}</Typography>
              <img src={data.logos[0].data_url}  style={{width:'30px', height:'30px'}} />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={6}>
            <Typography variant="label" sx={{marginBottom:'16px'}}>Distribution country (countries)</Typography>
            {data.locations.map((location, index)=>{
              return( <Typography variant='p_large_dark' sx={{marginTop:'16px'}} key={index}>{location.country}</Typography> )
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
                {Object.keys(data.productDetails).map((productDetail) => {return(
                  <>
                    <Grid item xs={4}>
                      {productDetail}
                    </Grid>
                    <Grid item xs={8}>
                      {data.productDetails[productDetail].capacity + ' ' + data.productDetails[productDetail].unit + ' / ' + data.productDetails[productDetail].price + ' ' + data.productDetails[productDetail].currency }
                    </Grid>
                  </>)
                })}
              </Grid>
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
                
                <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Certification</Typography>
                <Typography variant='p_large_dark' sx={{marginTop:'16px', marginBottom:'48px' }}>{data.productionDetails.certifyingOrganization}</Typography>
                <Carousel>
                {data.images.map((image, index)=>{
                  return( <img key={index} src={image.data_url}/> )
                })}
                </Carousel>
              </Box>
            </Grid>
            <Grid item xs={0} sm={1} />
            <Grid item sm={3} xs={12} order={{xs:-1, sm:3}} marginBottom='24px'>
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

    </>
  )
}

export default Profile