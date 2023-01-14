import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Box } from '@mui/material';
import AdminApprovalOptions from '../Components/AdminApprovalOptions';
import { getBuyer } from '../firestore';
import { Typography } from '@mui/material';

function BuyerProfile() {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    getBuyer(id).then((data) => {
      setData(data)
    })
  }, [id])

  return (
    <>
      {data && 
        <Box mx='24px' sx={{ marginTop:'56px'}}>
          <AdminApprovalOptions props={{ data:data, id:id, isSeller:false }} />
          <Box marginTop={2}>status: <Typography variant='h2'>{data.status}</Typography></Box>
          <Box marginTop={2}>Organization: <Typography variant='h2'>{data.organization}</Typography></Box>
          <Box marginTop={2}>Name: <Typography variant='h2'>{data.name}</Typography></Box>
          <Box marginTop={2}>Role: <Typography variant='h2'>{data.role}</Typography></Box>
          <Box marginTop={2}>Work Email: <Typography variant='h2'>{data.email}</Typography></Box>
        </Box> 
      }
    </>
  )
}

export default BuyerProfile