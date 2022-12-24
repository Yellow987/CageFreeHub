import { useOutletContext } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Alert, FormGroup, TextField, Typography, FormControlLabel, Checkbox, Button } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Contact() {
    const [setPage, saveData, data] = useOutletContext();
    const nameRef = useRef('')
    const jobTitleRef = useRef('')
    const [contactMethods, setContactMethods] = useState({
      phone: data.contactChannels.phone !== '', 
      whatsapp: data.contactChannels.whatsapp !== '', 
      wechat: data.contactChannels.wechat !== ''
    })
    const [phone, setPhone] = useState(data.contactChannels.phone)
    const [whatsapp, setWhatsapp] = useState(data.contactChannels.whatsapp)
    const [wechat, setWechat] = useState(data.contactChannels.wechat)

    const navigate = useNavigate()
    useEffect(() => {
        setPage('Contact')
        nameRef.current.value = data.name
        jobTitleRef.current.value = data.jobTitle
    }, [data, setPage])
  
    function changePage(e, newPage) {
      e.preventDefault()
      if (isDataValid()) {
        saveData({name: nameRef.current.value, 
          jobTitle: jobTitleRef.current.value, 
          contactChannels: {
            phone: contactMethods.phone ? phone : '', 
            whatsapp: contactMethods.whatsapp ? whatsapp : '', 
            wechat: contactMethods.wechat ? wechat : ''
          }
        })
        navigate(newPage)
      }
    }

    function isDataValid() {
        return true
    }

    return(
        <Box sx={{ display:'flex', flexDirection:'column' }}>
          <Typography variant="h1_32" >Contact person for purchase inquiries</Typography>
          <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
            <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
          </Alert>
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Full Name of Contact</Typography>
          <TextField variant="outlined" placeholder='E.g. Chung Lui' inputRef={nameRef}/>
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Job title of contact (optional)</Typography>
          <TextField variant="outlined" placeholder='E.g. CEO' inputRef={jobTitleRef}/>

          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Available contact channels</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={contactMethods.phone} onClick={() => setContactMethods({...contactMethods, phone:!contactMethods['phone']})}/>} label="Phone" />
            {contactMethods.phone && <PhoneInput placeholder="Enter phone number" value={phone} onChange={setPhone} preferredCountries={['cn','in','id','jp','my','ph','th']} enableSearch/>}
            <FormControlLabel control={<Checkbox checked={contactMethods.whatsapp} onClick={() => setContactMethods({...contactMethods, whatsapp:!contactMethods['whatsapp']})}/>} label="Whatsapp" />
            {contactMethods.whatsapp && <PhoneInput placeholder="Enter whatsapp number" value={whatsapp} onChange={setWhatsapp} preferredCountries={['cn','in','id','jp','my','ph','th']} enableSearch/>}
            <FormControlLabel control={<Checkbox checked={contactMethods.wechat} onClick={() => setContactMethods({...contactMethods, wechat:!contactMethods['wechat']})}/>}label="WeChat" />
            {contactMethods.wechat && <PhoneInput placeholder="Enter wechat number" value={wechat} onChange={setWechat} preferredCountries={['cn','in','id','jp','my','ph','th']} enableSearch/>}
          </FormGroup>
          <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
            <Button><Typography variant='p_default' onClick={(e) => { changePage(e, "/profile/locations") }}>← Back</Typography></Button>
            <Button variant='contained' onClick={(e) => { changePage(e, "/profile/product-details") }}>
                Next →
            </Button>
          </Box>
        </Box>
    )
}

export default Contact