import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useOutletContext } from 'react-router';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
            navigate('/profile/locations')
        } else if (goToPage === 'back') {
            setGoToPage('')
            navigate('/profile/welcome')
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