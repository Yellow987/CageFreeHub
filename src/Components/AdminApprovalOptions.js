import React from 'react'
import { Box, Button } from '@mui/material';
import { setDoc } from 'firebase/firestore'
import adminUid from '../AdminAccountsConfig'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminApprovalOptions(props) {
  const { data, docRef, id } = props.props
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  function changeProfileStatus(status) {
    setDoc(docRef, {...data, status:status})
  }

  function handleApprove(e) {
    e.preventDefault()
    window.confirm('Are you sure you want to **APPROVE** this profile?')
    changeProfileStatus('approved')
  }

  function handleReject(e) {
    e.preventDefault()
    window.confirm('Are you sure you want to **REJECT** this profile?')
    changeProfileStatus('rejected')
  }

  function handleEdit(e) {
    e.preventDefault()
    localStorage.setItem('uidToEdit', JSON.stringify(id))
    navigate('/profile/basics')
  }

  return (
    <>
      {currentUser?.uid === adminUid && <Box sx={{ marginBottom:4 }}>
        <Button variant='contained' onClick={(e) => handleApprove(e)}>Approve Profile</Button>
        <Button color='megaDanger' sx={{ marginLeft:5 }} onClick={(e) => handleReject(e)} variant='contained'>Reject Profile</Button>
        <Button variant='outlined' sx={{ marginLeft:5 }} onClick={(e) => handleEdit(e)} >Edit Profile</Button>
      </Box>}
    </>
  )
}

export default AdminApprovalOptions