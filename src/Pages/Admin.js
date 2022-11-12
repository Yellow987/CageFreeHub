import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { collection, getFirestore, query, orderBy, where, limit, getDocs } from "firebase/firestore";

function Admin() {
  const db = getFirestore();
  const [queryParams, setQueryParams] = useState({whom:'sellers', status:'pending'})
  const [data, setData] = useState([])

  const columns = [
    "name", 
    "adminLastStatusUpdate",
    {
      name:"userID",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const id = data[dataIndex]['userID']
          return (
            <Typography color='primary.main' fontWeight='bold' component={Link} to={"/profile/" + id} >
              {id}
            </Typography>
          )
        }
      }
    }, 
  ];

  const options = {
    responsive: 'standard',
    filter: false,
    sort: false,
    download: false,
    print: false,
    checkbox: false,
    selectableRows: 'none'
  }

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
      console.log(newData)
      setData([...newData])
    })
  }

  return (
    <Box sx={{ margin:'auto' }}>
      <MUIDataTable
        title="datatable"
        data={data}
        columns={columns}
        options={options}
      />
      <Box sx={{ display:'flex', alignItems: 'center'}}>
        <Box sx={{ width:'40%'}}>
          <Box sx={{ marginTop:2 }}>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, whom:'sellers'})}>sellers</Button>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, whom:'buyers'})}>buyers</Button>
          </Box>
          <Box sx={{ marginTop:2 }}>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, status:'approved'})}>Approved</Button>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, status:'pending'})}>Pending</Button>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, status:'rejected'})}>Rejected</Button>
          </Box>
        </Box>
        <Box sx={{ width:'40%' }}>
          <Typography>{JSON.stringify(queryParams)}</Typography>
        </Box>
        <Box sx={{ width:'20%'}}>
          <Button fullWidth variant='contained' onClick={() => getData(queryParams.whom === 'sellers' ? 'farms' : 'buyers', queryParams.status)}>SEARCH</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Admin
