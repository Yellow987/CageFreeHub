import { useOutletContext } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Box, Button } from '@mui/material';

function Basics() {
    const [setPage, saveData, data] = useOutletContext()
    const navigate = useNavigate()
    const websiteRef = useRef('')
    const organizationNameRef = useRef()
    const [errors, setErrors] = useState({
        organizationName: false
    })

    useEffect(() => {
        setPage('Basics')
        websiteRef.current.value = data.website
        organizationNameRef.current.value = data.organizationName
    }, [setPage, data.website, data.organizationName])

    function changePage(e, newPage) {
        e.preventDefault()
        if (isDataValid()) {
            const data = { 
                organizationName: organizationNameRef.current.value, 
                website: websiteRef.current.value.startsWith('http') ? websiteRef.current.value : 'https://' + websiteRef.current.value 
            }
            saveData(data)
            navigate(newPage)
        }
    }

    function isDataValid() {
        let errors = false
        let organizationName = false
        if (organizationNameRef.current.value === "") {
            errors = true
            organizationName = true
        }
        if (errors) {
            setErrors({ organizationName: organizationName})
            return false
        }
        return true
    }

    return(
        <Box sx={{ display:'flex', flexDirection:'column' }}>
            <Typography variant="h1_32" >Basics</Typography>
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                Organization Name
            </Typography>
            <TextField error={errors.organizationName} helperText={errors.organizationName ? "Organization Name is required" : ""} fullWidth inputRef={organizationNameRef}/>
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                Website (optional)
            </Typography>
            <TextField fullWidth inputRef={websiteRef} placeholder='E.g. http://marriot.com'/>
            <Box align='right' sx={{ marginTop:6, marginBottom:2 }}>
                <Button><Typography variant='p_default' onClick={(e) => { changePage(e, "/profile/welcome") }}>← Back</Typography></Button>
                <Button variant='contained' onClick={(e) => { changePage(e, "/profile/locations") }}>
                    Next →
                </Button>
            </Box>
        </Box>
    )
}

export default Basics