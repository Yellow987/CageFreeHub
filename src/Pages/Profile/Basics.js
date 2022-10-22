import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
function Basics() {
    const [setPage, goToPage, setGoToPage, formValues] = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        setPage('Basics')
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
            <Typography variant="h1_32" >Basics</Typography>
            <InputLabel style={{margin:'32px 0 10px 0'}}>
                <Typography variant="label" >
                    Company Name
                </Typography>
            </InputLabel>
            <TextField 
                // label="Company Name" 
                variant="outlined" 
                value={companyName[0]} 
                onChange={(e) => companyName[1](e.target.value)}
            />
            <InputLabel style={{margin:'32px 0 10px 0'}}>
                <Typography variant="label" >
                    Website
                </Typography>
            </InputLabel>
            <TextField 
                // label="Website" 
                variant="outlined" 
                value={website[0]}
                onChange={(e)=>website[1](e.target.value)}
                placeholder='E.g. http://marriot.com'
            />
        </Box>
    )
}

export default Basics