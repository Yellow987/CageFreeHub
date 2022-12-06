import { useEffect, useState, useCallback } from 'react'
import { Box, Typography,  Divider, Link  } from '@mui/material';
import { collection, getFirestore, query, orderBy, where, limit, getDocs } from 'firebase/firestore';

function Sellers(){
    const db = getFirestore();
    const [data, setData] = useState([])
  function getData(collectionName, status) {
    const dataQuery = query(collection(db, collectionName), orderBy('adminLastStatusUpdate'), where('status', '==', status), limit(10))
    getDocs(dataQuery).then((docs) => {
      const newData = docs.docs.reduce((acc, doc) => {
        const docData = doc.data()
        return [...acc, {
          ...docData, 
          userID: doc.id,
          adminLastStatusUpdate:(new Date(docData['adminLastStatusUpdate'].seconds * 1000)).toString()
        }]
      }, [])
      // console.log(typeof newData)
      setData([...newData])
    })
  }
  useEffect(() => {
    getData('farms', 'approved');
  }, []);
    console.log(data)
    return(
        <>
        {
            Object.values(data).map((farm, index)=>{
                return(
                    <Link href={'/profile/'+ farm.userID} sx={{textDecoration:'none'}}>
                        <Box key={index} sx={{
                            border: "1px solid #DFE3E9",
                            boxShadow: "0px 1px 4px rgba(27, 43, 62, 0.1)",
                            borderRadius: "3px", 
                            maxWidth:{xs: "90%", md:'920px'}, 
                            margin:"20px auto", 
                            padding:"20px",
                        }}>
                            <Typography variant='h2' sx={{color:'black'}}>{farm.organizationName}</Typography>
                            <Box sx={{height:"20px", width:'80px'}}></Box>
                            <Box sx={{display:'flex',
                            flexDirection: {xs: 'column', md: 'row'}}}>
                                <Box>
                                    <Typography variant='label'>Distribution Country (countries)</Typography>
                                    {farm.locations.map((location, index)=>{
                                        return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{location.city+', '+ location.country}</Typography> )
                                    })}
                                </Box>
                                <Box sx={{height:"20px", width:'80px'}}></Box>
                                <Box sx={{display:'flex'}}>
                                    <Box sx={{marginRight:'40px'}}>
                                        <Typography variant='label'>Egg Type</Typography>
                                        {Object.keys(farm.productDetails).map((productType, index)=>{
                                            return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{productType}</Typography> )
                                        })}
                                    </Box>
                                    <Box>
                                        <Typography variant='label'>Production capacity (per year) / Price</Typography>
                                        {Object.values(farm.productDetails).map((productAmount, index)=>{
                                            return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{productAmount.capacity + ' ' + productAmount.unit + ' / ' + productAmount.price + ' ' + productAmount.currency }</Typography> )
                                        })}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                )}
            )
        }
        </>
    );
}

export default Sellers;