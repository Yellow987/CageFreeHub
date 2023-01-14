import { useEffect, useState, useCallback, useRef } from 'react'
import { Box, Typography, Link, Paper, Button, Divider } from '@mui/material';
import { collection, getFirestore, query, orderBy, where, limit, getDocs, startAfter } from 'firebase/firestore';
import ProductDetailsDisplay from '../Components/ProductDetailsDisplay';
import { ViewportList } from 'react-viewport-list';
import ClaimedPopup from '../Components/ClaimedPopup';

function Sellers(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const lastDocRef = useRef(null)
  const [isMoreData, setIsMoreData] = useState(true)
  const viewRef = useRef(null)
  const farmsPerPage = 5

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
  <Box sx={{ maxWidth:"920px", margin:{xs:"0px", md:"auto"} }}>
    <Typography variant='h1' sx={{ marginTop:"48px", marginBottom:"48px", display:{xs: 'none', md:'block'} }}>Cage-free egg seller directory</Typography>
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
              <Divider sx={{ display:{xs: 'block', md:'none'} }}/>
              <Paper sx={{ 
                marginBottom:{xs:"0px", md:"48px"}, 
                padding:"8px 8px 40px 40px",
                boxShadow:{xs:'none', md:"0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"} 
              }}>
                <Box display='flex' justifyContent='flex-end'>
                  <ClaimedPopup props={{ isClaimed:farm.claimed }} />
                </Box>
                <Typography variant='h2' sx={{ color:'black', marginTop:1 }}>{farm.organizationName}</Typography>
                <Box sx={{height:"20px", width:'80px'}}></Box>
                <Box sx={{display:'flex', flexDirection: {xs: 'column', md: 'row'}}}>
                  <Box>
                    <Typography variant='label'>Distribution Country (countries)</Typography>
                    {farm.locations.map((location, index)=>{
                      return( <Typography variant='p_large' sx={{ marginTop:'16px', color:"#1B2B3E" }} key={index}>{location.city.trim()+', '+ location.country.label}</Typography> )
                    })}
                  </Box>
                  <Box sx={{height:"20px", width:'80px'}}></Box>
                  <ProductDetailsDisplay props={{ productDetails:farm.productDetails, divs:true }} />
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
      marginTop='48px'
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