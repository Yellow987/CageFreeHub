import { useOutletContext } from 'react-router';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Alert, FormGroup, TextField, Typography, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl } from '@mui/material'

function Contact() {
    const [setPage, goToPage, setGoToPage, formValues] = useOutletContext()
    // const companyNameRef = useRef('hello')
    // const websiteRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        setPage('Contact')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (goToPage === '') {return}
        if (goToPage === 'next') {
            setGoToPage('')
            navigate('/profile/product-details')
        } else if (goToPage === 'back') {
            setGoToPage('')
            navigate('/profile/locations')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goToPage])
    const {companyName, website} = formValues;
    

    return(
        <Box style={{
            display:'flex', 
            justifyContent:'flex-start', 
            flexFlow:'column', 
            textAlign:'left'}} >
            <Typography variant="h1_32" >Contact person for purchase inquiries</Typography>
            <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
              <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
            </Alert>
            <InputLabel style={{margin:'32px 0 10px 0'}}>
              <Typography variant="label" >
                  Full Name of Contact
              </Typography>
            </InputLabel>
            <TextField 
                // label="Company Name" 
                variant="outlined" 
                value={companyName[0]} 
                placeholder='E.g. Chung Lui'
                onChange={(e) => companyName[1](e.target.value)}
            />
            <InputLabel style={{margin:'32px 0 10px 0'}}>
              <Typography variant="label" >
                Job title of contact (optional)
              </Typography>
            </InputLabel>
            <TextField 
                // label="Website" 
                variant="outlined" 
                value={website[0]}
                onChange={(e)=>website[1](e.target.value)}
                placeholder='E.g. CEO'
            />
            <InputLabel style={{margin:'32px 0 10px 0'}}>
              <Typography variant="label" >
                Available contact channels
              </Typography>
            </InputLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Phone" />
              <FormControlLabel control={<Checkbox />} label="Whatsapp" />
              <FormControlLabel control={<Checkbox />} label="WeChat" />
            </FormGroup>
        </Box>
    )
}

export default Contact