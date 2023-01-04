import { Box, Button, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import { useState, useRef } from 'react';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from 'react-router-dom';
import { collection, getFirestore, query, orderBy, where, limit, getDocs } from "firebase/firestore";
import uuid from 'react-uuid';

function Admin() {
  const db = getFirestore();
  const [queryParams, setQueryParams] = useState({ userType:'sellers', status:'pending', claimed:'any'})
  const [data, setData] = useState([])
  const limitRef = useRef(null)
  const navigate = useNavigate()

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

  function getData(collectionName, queryParams) {
    setData([])
    const params = [collection(db, collectionName), orderBy('adminLastStatusUpdate', 'desc'), limit(limitRef.current.value)]
    if (queryParams.status !== 'any') {
      params.push(where('status', '==', queryParams.status))
    }
    if (queryParams.claimed !== 'any') {
      params.push(where('claimed', '==', queryParams.claimed === 'claimed' ? true : false))
    }
    const dataQuery = query(...params)
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

  function createSkeletonAccount(e) {
    e.preventDefault()
    const newProfileUUID = uuid()
    localStorage.setItem('uidToEdit', JSON.stringify(newProfileUUID))
    navigate('/profile/basics')
  }

  return (
    <Box sx={{ margin:'auto', marginLeft:2, marginRight:2 }}>
      <Button 
        variant='contained' 
        sx={{ marginBottom:2 }}
        onClick={(e) => {createSkeletonAccount(e)}}  
      >
        Create skeleton account
      </Button>
      <MUIDataTable
        title="datatable"
        data={data}
        columns={columns}
        options={options}
      />
      <Box sx={{ display:'flex', alignItems: 'center', marginBottom:8 }}>
        <Box sx={{ width:'40%'}}>
          <FormControl style={{ marginTop:'16px', width:'100%' }}>
            <FormLabel>User Type</FormLabel>
            <RadioGroup
              row
              value={queryParams.userType}
              onChange={(e) => setQueryParams({ ...queryParams, userType:e.target.value })}
            >
              <FormControlLabel control={<Radio/>} label='Sellers' value='sellers' />
              <FormControlLabel control={<Radio/>} label='Buyers' value='buyers' />
            </RadioGroup>
          </FormControl>
          <FormControl style={{ marginTop:'16px' }}>
            <FormLabel>Displayed in Directory Status(only approved are shown)</FormLabel>
            <RadioGroup
              row
              value={queryParams.status}
              onChange={(e) => setQueryParams({ ...queryParams, status:e.target.value })}
            >
              <FormControlLabel control={<Radio/>} label='Approved' value='approved' />
              <FormControlLabel control={<Radio/>} label='Pending' value='pending' />
              <FormControlLabel control={<Radio/>} label='Rejected' value='rejected' />
              <FormControlLabel control={<Radio/>} label='Incomplete' value='incomplete' />
              <FormControlLabel control={<Radio/>} label='Claimed Skeleton Account' value='claimedSkeletonAccount' />
              <FormControlLabel control={<Radio/>} label='Any' value='any' />
            </RadioGroup>
          </FormControl>
          <FormControl style={{ marginTop:'16px' }}>
            <FormLabel>Profile Claim Status</FormLabel>
            <RadioGroup
              row
              value={queryParams.claimed}
              onChange={(e) => setQueryParams({ ...queryParams, claimed:e.target.value })}
            >
              <FormControlLabel control={<Radio/>} label='Claimed' value='claimed' />
              <FormControlLabel control={<Radio/>} label='Unclaimed' value='unclaimed' />
              <FormControlLabel control={<Radio/>} label='Any' value='any' />
            </RadioGroup>
          </FormControl>
          <Box sx={{ marginTop:2 }}>
            <Typography>query how many buyers/sellers?:</Typography>
            <TextField  size="small" type="number" inputRef={limitRef} defaultValue={10}/>
          </Box>
        </Box>
        <Box sx={{ width:'20%'}}>
          <Button fullWidth variant='contained' onClick={() => getData(queryParams.userType === 'sellers' ? 'farms' : 'buyers', queryParams)}>SEARCH</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Admin
