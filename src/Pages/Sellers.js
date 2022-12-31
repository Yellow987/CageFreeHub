import { useEffect, useState, useCallback, useRef } from 'react'
import { Box, Typography, Link, Paper, Button  } from '@mui/material';
import { collection, getFirestore, query, orderBy, where, limit, getDocs, startAfter } from 'firebase/firestore';
import ProductDetailsDisplay from '../Components/ProductDetailsDisplay';
import { ViewportList } from 'react-viewport-list';

function Sellers(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const lastDocRef = useRef(null)
  const [isMoreData, setIsMoreData] = useState(true)
  const viewRef = useRef(null)
  const farmsPerPage = 2

  const getMoreData = useCallback((value = -10) => {

    console.log(value, data.length, value >= data.length ? "getting data" : "stopping")
    if (loading || value < data.length) {return}
    
    setLoading(true)
    getDataFromFirebase(data.length).then((dataFromFirebase) => {
      const dataCopy = [...data]
      const newData = addDataIntoArrayAtIndex(dataCopy, dataFromFirebase, data.length)
      setData([...newData])
      setLoading(false)
    })

    async function getDataFromFirebase(skip) {
      return new Promise((resolve) => {
        let dataQuery;
        if (!lastDocRef.current) {
          dataQuery = query(
            collection(getFirestore(), 'farms'), 
            orderBy('maxObjectiveCapacity', "desc"), 
            where('status', '==', 'approved'), 
            limit(farmsPerPage)
          )
        } else {
          dataQuery = query(
            collection(getFirestore(), 'farms'), 
            orderBy('maxObjectiveCapacity', "desc"), 
            where('status', '==', 'approved'), 
            startAfter(lastDocRef.current), 
            limit(farmsPerPage)
          )
        }
        getDocs(dataQuery).then((docs) => {
          const newData = docs.docs.reduce((acc, doc) => {
            const docData = doc.data()
            return [...acc, {
              ...docData, 
              userID: doc.id,
              adminLastStatusUpdate:(new Date(docData['adminLastStatusUpdate'].seconds * 1000)).toString()
            }]
          }, [])
          lastDocRef.current = docs.docs[docs.docs.length - 1]
          if (!lastDocRef.current) {
            setIsMoreData(false)
          }
          resolve(newData)
        })
      })
    }

    function addDataIntoArrayAtIndex(dataCopy, newData, startIndex) {
      for (let i = startIndex; i < startIndex + farmsPerPage; i++) {
        if (!newData[i - startIndex]) { continue }
        dataCopy[i] = newData[i - startIndex]
      }
      return dataCopy
    }
  }, [data, loading])

  useEffect(() => {
    getMoreData(0)
  }, [getMoreData]);

  return(
  <Box sx={{ maxWidth:"920px", margin:{xs:"24px", md:"auto"} }}>
    <Typography variant='h1' style={{ marginTop:"48px", marginBottom:"48px" }}>Cage-free egg seller directory</Typography>
    {data && 
      <div ref={viewRef}>
        <ViewportList
          viewportRef={viewRef}
          items={data}
          margin={8}
          itemMinSize={50}
        >
          {(farm, index) => (
            <Link key={index} href={'/profile/'+ farm.userID} sx={{textDecoration:'none'}}>
              <Paper elevation={3} style={{ marginBottom:"48px", padding:"40px" }}>
                <Typography variant='h2' sx={{color:'black'}}>{farm.organizationName}</Typography>
                <Box sx={{height:"20px", width:'80px'}}></Box>
                <Box sx={{display:'flex', flexDirection: {xs: 'column', md: 'row'}}}>
                  <Box>
                    <Typography variant='label'>Distribution Country (countries)</Typography>
                    {farm.locations.map((location, index)=>{
                      return( <Typography variant='p_large' sx={{marginTop:'16px'}} key={index}>{location.city+', '+ location.country}</Typography> )
                    })}
                  </Box>
                  <Box sx={{height:"20px", width:'80px'}}></Box>
                  <ProductDetailsDisplay props={{ productDetails:farm.productDetails }} />
                </Box>
              </Paper>
            </Link>
          )}
        </ViewportList>
      </div>
    }
    <Box 
      alignItems="center"
      justifyContent="center"
      display="flex"
      marginBottom='40px'
    >
      {isMoreData && 
        <Button 
          size='large'
          variant='contained' 
          onClick={() => {getMoreData(data.length)}}
          style={{ borderRadius:50, paddingLeft:'64px', paddingRight:'64px' }}
        >
          More Results 
        </Button>
      }
      {!isMoreData &&
        <Typography variant='h2'>
          End of results
        </Typography>
      }
    </Box>
  </Box>
);
}

export default Sellers;