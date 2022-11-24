import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import { Box, Typography,  Divider, Link  } from '@mui/material';
import { collection, getFirestore, query, orderBy, where, limit, getDocs } from 'firebase/firestore';
import Carousel from 'react-material-ui-carousel';
import { useAuth } from './../AuthContext';
import { getFarms } from './../firestore'
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
                    <Box key={index}>
                        <Typography variant='h2'>{farm.organizationName}</Typography>
                        <Typography variant='label'>Distribution Country (countries)</Typography>
                        {farm.locations.map((location, index)=>{
                            return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{location.city+', '+ location.country}</Typography> )
                        })}
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
                        <Link href={'/profile/'+ farm.userID}>Read More</Link>
                    </Box>
                )}
            )
        }
        </>
    );
}

export default Sellers;