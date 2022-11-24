import { React, useRef, useState, useEffect, useCallback } from "react";
import Alert from "@mui/material/Alert";
import { Box, MenuItem, Typography, Select, TextField, InputLabel, FormControl } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from "@mui/material";
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from "react-router";

function BuyerSetup() {
  const nameRef = useRef(null)
  const organizationRef = useRef(null)
  const emailRef = useRef(null)
  const [data, setData] = useState(null)
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const roles = ['Procurement officer', 'Purchasing officer', 'Sustainability officer', 'Other']
  const { currentUser } = useAuth();
  const db = getFirestore();
  const docRef = useCallback(() => { return doc(db, "buyers", currentUser.uid) }, [db, currentUser.uid])
  const Navigate = useNavigate()

  useEffect(() => {
    onSnapshot(docRef(), (doc) => {
      if (doc.exists()) {
        const docData = doc.data()
        setData(docData)
        nameRef.current.value = docData.name
        organizationRef.current.value = docData.organization
        setRole(docData.role)
        emailRef.current.value = docData.email
        setLoading(false)
      } else {
        const utcDate = new Date()
        const initialData = {
          //Meta
          status: 'pending',
          adminLastStatusUpdate: utcDate,
          creationDate: utcDate,
    
          //Data
          name: '',
          organization: '',
          role: '',
          email: ''
        }
        setDoc(docRef, initialData).then(() => {
          setLoading(false)
        })
      }
    })
  }, [docRef])

  function submit(e) {
    e.preventDefault()
    setSaving(true)

    const newData = {
      name: nameRef.current.value,
      organization: organizationRef.current.value,
      role: role,
      email: emailRef.current.value
    }
    setDoc(docRef(), {...data, ...newData}).then(() => {
      setSaving(false)
      Navigate('/confirm-email')
    })
  }

  return (
    <Box align='center' mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'400px', mt:{ sm:'48px', xs:'24px'}, textAlign:'left' }} display={loading ? 'none' : 'block'}>
      <Typography variant='h1'>Basic info</Typography>
      <Alert sx={{ marginTop:'32px' }} iconMapping={{ success: <InfoOutlinedIcon sx={{ margin:'auto' }} /> }}>
        <Typography variant='p_default' color='#3FAB94' >
          Please provide us this basic information about you and your organization so that we can assure seller information remains private and respected
        </Typography>
      </Alert>
      <Typography variant="label" marginTop='32px'>Full name</Typography>
      <TextField fullWidth style={{ marginTop:'8px' }} inputRef={nameRef} />
      <Typography variant="label" marginTop='32px'>Organization</Typography>
      <TextField fullWidth style={{ marginTop:'8px' }} inputRef={organizationRef} />
      <Typography variant="label" marginTop='32px'>Role at Organization</Typography>
        <FormControl fullWidth style={{ marginTop:'8px' }}>
        <InputLabel id='selectRole' >Select role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)} label='Select role' labelId='selectRole'>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="label" marginTop='32px'>Work email</Typography>
      <TextField fullWidth style={{ marginTop:'8px' }} inputRef={emailRef} />

      <Button variant="contained" disabled={saving} fullWidth style={{ marginTop:'48px', marginBottom:'32px' }} onClick={(e) => submit(e)}>
        Submit <ArrowRightAltIcon fontSize="inherit" style={{ fontSize: "20px" }}/>
      </Button>
    </Box>
  );
}
export default BuyerSetup;