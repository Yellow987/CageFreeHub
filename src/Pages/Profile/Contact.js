import { useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Alert, FormGroup, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage';

function Contact() {
    const [setPage, saveData, data] = useOutletContext();
    const [contactMethods, setContactMethods] = useState({
      phone: data.contactChannels.phone !== '', 
      whatsapp: data.contactChannels.whatsapp !== '', 
      wechat: data.contactChannels.wechat !== ''
    })
    const [phone, setPhone] = useState(data.contactChannels.phone)
    const [whatsapp, setWhatsapp] = useState(data.contactChannels.whatsapp)
    const [wechat, setWechat] = useState(data.contactChannels.wechat)
    const { 
      handleSubmit, 
      register, 
      getValues,
      formState: { errors }
    } = useForm({
      defaultValues: {
        fullName: data.name,
        jobTitle:  data.jobTitle,
        phone: "",
        whatsapp: "",
        wechat: ""
      }
    })
  

    const navigate = useNavigate()
    useEffect(() => {
        setPage('Contact')
    }, [data, setPage])
  
    function changePage(newPage) {
      saveData({
        name: getValues("fullName"), 
        jobTitle: getValues("jobTitle"), 
        contactChannels: {
          phone: contactMethods.phone ? phone : '', 
          whatsapp: contactMethods.whatsapp ? whatsapp : '', 
          wechat: contactMethods.wechat ? wechat : ''
        }
      })
      navigate(newPage)
    }

    return(
        <Box sx={{ display:'flex', flexDirection:'column' }} component='form' onSubmit={handleSubmit(() => changePage("/profile/product-details"))}>
          {data.distributionCountries}
          <Typography variant="h1_32" >Contact person for purchase inquiries</Typography>
          <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
            <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
          </Alert>
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Full Name of Contact</Typography>
          <TextField 
            placeholder='E.g. Chung Lui'
            {...register("fullName", { required:"This field is required" })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Job title of contact (optional)</Typography>
          <TextField placeholder='E.g. CEO'{...register("jobTitle")}/>

          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Available contact channels</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={contactMethods.phone} onClick={() => setContactMethods({...contactMethods, phone:!contactMethods['phone']})}/>} label="Phone" />
            {contactMethods.phone && <PhoneInput placeholder="Enter phone number" value={phone} onChange={setPhone} preferredCountries={['cn','in','id','jp','my','ph','th']} enableSearch/>}
            <FormControlLabel control={<Checkbox checked={contactMethods.whatsapp} onClick={() => setContactMethods({...contactMethods, whatsapp:!contactMethods['whatsapp']})}/>} label="Whatsapp" />
            {contactMethods.whatsapp && <PhoneInput placeholder="Enter whatsapp number" value={whatsapp} onChange={setWhatsapp} preferredCountries={['cn','in','id','jp','my','ph','th']} enableSearch/>}
            <FormControlLabel control={<Checkbox checked={contactMethods.wechat} onClick={() => setContactMethods({...contactMethods, wechat:!contactMethods['wechat']})}/>}label="WeChat" />
            {contactMethods.wechat && <PhoneInput placeholder="Enter wechat number" value={wechat} onChange={setWechat} preferredCountries={['cn','in','id','jp','my','ph','th']} enableSearch/>}
          </FormGroup>
          <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/locations", nextPage:"/profile/product-details" }}/>
        </Box>
    )
}

export default Contact