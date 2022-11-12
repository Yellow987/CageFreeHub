import React from 'react'
import { Box, Button } from '@mui/material';
import { setDoc } from 'firebase/firestore'

function AdminApprovalOptions(props) {
  const { data, docRef } = props.props

  function changeProfileStatus(status) {
    setDoc(docRef, {...data, status:status})
  }

  function handleApprove() {
    window.confirm('Are you sure you want to **APPROVE** this profile?')
    changeProfileStatus('approved')
  }

  function handleReject() {
    window.confirm('Are you sure you want to **REJECT** this profile?')
    changeProfileStatus('rejected')
  }

  return (
    <Box sx={{ marginBottom:4 }}>
      <Button variant='contained' onClick={() => handleApprove()}>Approve Profile</Button>
      <Button color='megaDanger' sx={{ marginLeft:5 }} onClick={() => handleReject()} variant='contained'>Reject Profile</Button>
    </Box>
  )
}

export default AdminApprovalOptions