import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useRef } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { collection, getFirestore, query, orderBy, where, limit, getDocs } from "firebase/firestore";

function Admin() {
  const db = getFirestore();
  const [queryParams, setQueryParams] = useState({whom:'sellers', status:'pending', claim:'claimed'})
  const [data, setData] = useState([])
  const limitRef = useRef(null)

  const columns = [
    "name", 
    "adminLastStatusUpdate",
    {
      name:"UserID",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const id = data[dataIndex]['userID']
          return (
            <Typography color='primary.main' fontWeight='bold' component={Link} to={"/profile/" + id} target="_blank">
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
    setData([])
    const dataQuery = query(collection(db, collectionName), orderBy('adminLastStatusUpdate'), where('status', '==', status), limit(limitRef.current.value))
    getDocs(dataQuery).then((docs) => {
      const newData = docs.docs.reduce((acc, doc) => {
        const docData = doc.data()
        return [...acc, {
          ...docData, 
          userID: doc.id,
          adminLastStatusUpdate:(new Date(docData['adminLastStatusUpdate'].seconds * 1000).toLocaleString("en-US")).toString()
        }]
      }, [])
      console.log(newData)
      setData([...newData])
    })
  }

  return (
    <Box sx={{ margin:'auto', marginLeft:2, marginRight:2 }}>
      <Button variant='contained' sx={{ marginBottom:2 }}>
        Create new account
      </Button>
      <MUIDataTable
        title="datatable"
        data={data}
        columns={columns}
        options={options}
        onChangePage={(e) => {console.log('ho')}}
      />
      <Box sx={{ display:'flex', alignItems: 'center', marginBottom:8 }}>
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
          <Box sx={{ marginTop:2 }}>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, claim:'claimed'})}>claimed</Button>
            <Button variant='contained' onClick={() => setQueryParams({...queryParams, claim:'unclaimed'})}>unclaimed</Button>
          </Box>
          <Box sx={{ marginTop:2 }}>
            <Typography>query how many buyers/sellers?:</Typography>
            <TextField  size="small" type="number" inputRef={limitRef} defaultValue={10}/>
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
