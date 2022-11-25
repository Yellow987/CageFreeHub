import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import { Box, Typography,  Divider, Link  } from '@mui/material';
import AdminApprovalOptions from '../../Components/AdminApprovalOptions';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Carousel from 'react-material-ui-carousel';
import { useAuth } from './../../AuthContext';
function Profile() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [ userData, setUserData ] = useState();
  const db = getFirestore()
  const docRef = useCallback(() => { return doc(db, "farms", id) }, [db, id])
  const { currentUser } = useAuth()
  const userDocRef = useCallback(()=>{ return doc(db,"users", currentUser.uid )}, [db, currentUser.uid])

  useEffect(() => {
    getDoc(docRef()).then((doc) => {
      setData(doc.data())
    })
    getDoc(userDocRef()).then((doc) => {
      setUserData(doc.data())
    })
  }, [docRef])
  return (
    <>
      {data && <Box sx={{ mx:'24px', marginTop:'56px' }}>
        {
          userData.isAdmin &&
          <>
            <AdminApprovalOptions props={{ data:data, docRef:docRef() }}/>
            <Box sx={{ background:'#F5F7F8', padding:2 }}>
              <Typography variant='p_large' fontWeight='bold'>Awaiting approval</Typography>
              <Typography variant='p_large'>
                <br/>Our team is reviewing your profile for approval <br/><br/>
                We’ll send a text to the provided number once the profile is approved<br/><br/>
                This will take 72 hours at most
              </Typography>
            </Box>
          </>
        }
        <Typography variant='h1' sx={{ marginTop:7 }}></Typography>
        <Box sx={{display:'flex', 
        margin:'0 auto', 
        justifyContent:'space-between', 
        maxWidth:{xs:'90%', md:'880px', lg:'1060px'}, 
        flexDirection:{xs:'column', md:'row'}}}>
            <Box sx={{order:{xs:'2', md:'-1'}, 
                      maxWidth:{xs:'90%', md:'620px'},
                      width:{xs:'90%', md:'620px'}
                    }}>
                <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'54px', alignItems:'center'}}>
                    <Typography variant="h1_32" >{data.organizationName}</Typography>
                    <img src={data.logos[0].data_url}  style={{width:'30px', height:'30px'}} />
                </Box>
                <Box>
                    <Typography variant="label" sx={{marginBottom:'16px'}}>Distribution country (countries)</Typography>
                    {data.locations.map((location, index)=>{
                      return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{location.country}</Typography> )
                    })}

                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Farm location(s)</Typography>
                    {data.locations.map((location, index)=>{
                      return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{location.city+', '+ location.country}</Typography> )
                    })}
                    
                </Box>
                <Box sx={{height:{xs:"20px", md:'96px'}, display:'flex', alignItems:'center'}}>
                  <Divider light />
                </Box>
                <Box>
                    <Box>
                        <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Cage-free egg type</Typography>
                        {Object.keys(data.productDetails).map((productType, index)=>{
                          return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{productType}</Typography> )
                        })}

                    </Box>
                    <Box>
                        <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Production capacity (year) / Price</Typography>
                        {Object.values(data.productDetails).map((productAmount, index)=>{
                          return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{productAmount.capacity + ' ' + productAmount.unit + ' / ' + productAmount.price + ' ' + productAmount.currency }</Typography> )
                        })}
                    </Box>
                </Box>
                <Box sx={{height:{xs:"20px", md:'96px'}, display:'flex', alignItems:'center'}}>
                  <Divider light />
                </Box>
                <Box>
                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Website</Typography>
                    <Link href={data.website} sx={{display:'block'}}>{data.website}</Link>
                    <Box sx={{height:{xs:"20px", md:'96px'}, display:'flex', alignItems:'center'}}>
                      <Divider light />
                    </Box>
                
                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Production system of farm(s)</Typography>
                    {data.productionDetails.productionSystem.map((system, index)=>{
                      return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{system}</Typography> )
                    })}
                    
                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Certification</Typography>
                    <Typography variant='p_large' sx={{marginTop:'16px', marginBottom:'48px' }}>{data.productionDetails.certifyingOrganization}</Typography>
                    <Carousel>
                    {data.images.map((image, index)=>{
                      return( <img key={index} src={image.data_url}/> )
                    })}
                    </Carousel>
                    
                </Box>

            </Box>
            <Box  sx={{
                            border: "1px solid #DFE3E9",
                            boxShadow: "0px 1px 4px rgba(27, 43, 62, 0.1)",
                            borderRadius: "3px", 
                            maxWidth:{xs: "100%", md:'328px'}, 
                            margin:"0 auto", 
                            padding:"20px",
                            height:'fit-content',
                        }}>
                <Typography variant="label" sx={{marginBottom:'16px'}}>Contact {data.organizationName}</Typography>
                {data.contactChannels.phone && (<><Typography variant="p_large" sx={{marginBottom:'16px'}}>Message {data.name} through the Phone</Typography>
                <Link href={'tel:' + data.contactChannels.phone} sx={{display:'block'}}>{data.contactChannels.phone}</Link></>)}
 
                {data.contactChannels.wechat && (<><Typography variant="p_large" sx={{marginBottom:'16px'}}>Message {data.name} through WeChat</Typography>
                <Link href={'tel:' + data.contactChannels.wechat} sx={{display:'block'}}>{data.contactChannels.wechat}</Link></>)}

                {data.contactChannels.whatsapp && (<><Typography variant="p_large" sx={{marginBottom:'16px'}}>Message {data.name} through WhatsApp</Typography>
                <Link href={'tel:' + data.contactChannels.whatsapp} sx={{display:'block'}}>{data.contactChannels.whatsapp}</Link></>)}
            </Box>
        </Box>
      </Box>}

    </>
  )
}

export default Profile