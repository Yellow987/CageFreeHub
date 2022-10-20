import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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


    return(
        <Box >
            <Typography variant="h1_32" >Basics</Typography>
            <TextField label="Company Name" variant="outlined" value={formValues.companyName[0]} onChange={(e) => formValues.companyName[1](e.target.value)}/>
            <TextField label="Website" variant="outlined" />
        </Box>
    )
}

export default Basics