import { React, useState, useEffect, useCallback } from "react";
import Alert from "@mui/material/Alert";
import { Box, MenuItem, Typography, Select, TextField, InputLabel, FormControl, FormHelperText } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from "@mui/material";
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { updateUserInfo } from "../../firestore";

function BuyerSetup() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const roles = ['Procurement officer', 'Purchasing officer', 'Sustainability officer', 'Other']
  const { currentUser } = useAuth();
  const db = getFirestore();
  const docRef = useCallback(() => { return doc(db, "buyers", currentUser.uid) }, [db, currentUser.uid])
  const Navigate = useNavigate()
  const { handleSubmit, getValues, setValue, formState: { errors }, register, control } = useForm({
    defaultValues: {
      name: "",
      organization: "",
      role: "",
      email: ""
    }
  })

  useEffect(() => {
    setLoading(false)
    onSnapshot(docRef(), (doc) => {
      if (doc.exists()) {
        const docData = doc.data()
        setData(docData)

        setValue('name', docData.name)
        setValue('organization', docData.organization)
        setValue('role', docData.role)
        setValue('email', docData.email)
        setLoading(false)
      } else {
        const utcDate = new Date()
        const initialData = {
          //Meta
          status: 'incomplete',
          adminLastStatusUpdate: utcDate,
          creationDate: utcDate,
    
          //Data
          accountEmail: currentUser.email,
          name: '',
          organization: '',
          role: '',
          email: ''
        }
        setDoc(docRef(), initialData).then(() => {
          setLoading(false)
        })
      }
    })
  }, [docRef, setValue, currentUser])

  function submitBuyerProfile() {
    setSaving(true)

    const newData = {
      name: getValues('name'),
      organization: getValues('organization'),
      role: getValues('role'),
      email: getValues('email')
    }
    setDoc(docRef(), {...data, ...newData}).then(() => {
      updateUserInfo( currentUser.uid, { isProfileComplete:true }).then(() => {
        setSaving(false)
        Navigate('/confirm-email')
      })
    })
  }

  return (
    <Box 
      align='center' 
      mx={{ sm:'auto', xs:'24px' }} 
      sx={{ maxWidth:'400px', mt:{ sm:'48px', xs:'24px'}, textAlign:'left' }} 
      display={loading ? 'none' : 'block'}
      component='form' 
      onSubmit={handleSubmit(() => submitBuyerProfile("/profile/imagery"))}
    >
      <Typography variant='h1'>Basic info</Typography>
      <Alert sx={{ marginTop:'32px' }} iconMapping={{ success: <InfoOutlinedIcon sx={{ margin:'auto' }} /> }}>
        <Typography variant='p_default' color='#3FAB94' >
          Please provide us this basic information about you and your organization so that we can assure seller information remains private and respected
        </Typography>
      </Alert>
      <Typography variant="label" marginTop='32px'>Full name</Typography>
      <TextField 
        fullWidth 
        style={{ marginTop:'8px' }} 
        {...register("name", { required:"This field is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Typography variant="label" marginTop='32px'>Organization</Typography>
      <TextField 
        fullWidth 
        style={{ marginTop:'8px' }} 
        {...register("organization", { required:"This field is required" })}
        error={!!errors.organization}
        helperText={errors.organization?.message}
      />
      <Typography variant="label" marginTop='32px'>Role at Organization</Typography>
        <FormControl fullWidth style={{ marginTop:'8px' }}>
        <InputLabel id='selectRole' >Select role</InputLabel>
        <Controller
          name="role"
          control={control}
          rules={{ required:"This field is required" }}
          render={({ field }) => (
            <Select 
              value={field.value} 
              onChange={(e) => field.onChange(e.target.value)} 
              label='Select role' 
              labelId='selectRole'
              error={!!errors.role}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.role?.message}</FormHelperText>
      </FormControl>
      <Typography variant="label" marginTop='32px'>Work email</Typography>
      <TextField 
        fullWidth 
        style={{ marginTop:'8px' }} 
        {...register("email", { required:"This field is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button 
        variant="contained" 
        disabled={saving} 
        fullWidth 
        style={{ marginTop:'48px', marginBottom:'32px' }} 
        type='form'
      >
        Submit <ArrowRightAltIcon fontSize="inherit" style={{ fontSize: "20px" }}/>
      </Button>
    </Box>
  );
}
export default BuyerSetup;