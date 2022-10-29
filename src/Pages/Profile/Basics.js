import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useOutletContext } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";

function Basics() {
    const [setPage, goToPage, setGoToPage, saveData, data] = useOutletContext()
    const navigate = useNavigate()
    const websiteRef = useRef('')
    const organizationNameRef = useRef('')

    useEffect(() => {
        setPage('Basics')
        websiteRef.current.value = data.website
        organizationNameRef.current.value = data.organizationName
    }, [data])

    useEffect(() => {
        if (goToPage === '') {return}
        saveData({ organizationName:organizationNameRef.current.value, website:websiteRef.current.value })
        if (goToPage === 'next') {
            setGoToPage('')
            navigate('/profile/locations')
        } else if (goToPage === 'back') {
            setGoToPage('')
            navigate('/profile/welcome')
        }
    }, [goToPage])
    
    return(
        <Box sx={{ display:'flex', flexDirection:'column' }}>
            <Typography variant="h1_32" >Basics</Typography>
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                Organization Name
            </Typography>
            <TextField fullWidth inputRef={organizationNameRef}/>
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                Website
            </Typography>
            <TextField fullWidth defaultValue='' inputRef={websiteRef} placeholder='E.g. http://marriot.com'/>
        </Box>
    )
}

export default Basics