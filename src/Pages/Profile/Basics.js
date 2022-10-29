import { useOutletContext } from 'react-router';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Box } from '@mui/material';

function Basics() {
    const [setPage, goToPage, setGoToPage, saveData, data] = useOutletContext()
    const navigate = useNavigate()
    const websiteRef = useRef('')
    const organizationNameRef = useRef()

    useEffect(() => {
        setPage('Basics')
        websiteRef.current.value = data.website
        organizationNameRef.current.value = data.organizationName
    }, [setPage])

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <TextField fullWidth inputRef={websiteRef} placeholder='E.g. http://marriot.com'/>
        </Box>
    )
}

export default Basics