import { useOutletContext } from 'react-router';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Box } from '@mui/material';
import { useForm } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage';

function Basics() {
    const [setPage, saveData, data] = useOutletContext()
    const navigate = useNavigate()
    const websiteRef = useRef('')
    const { handleSubmit, getValues, formState: { errors }, register } = useForm({
        defaultValues: {
          organizationName: data.organizationName
        }
    })

    useEffect(() => {
        setPage('Basics')
        websiteRef.current.value = data.website
    }, [setPage, data.website, data.organizationName])

    function changePage(newPage) {
        const data = { 
            organizationName: getValues("organizationName"), 
            website: websiteRef.current.value
        }
        saveData(data)
        navigate(newPage)
    }

    return(
        <Box sx={{ display:'flex', flexDirection:'column' }} component='form' onSubmit={handleSubmit(() => changePage("/profile/locations"))}>
            <Typography variant="h1_32" >Basics</Typography>
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                Organization Name
            </Typography>
            <TextField 
                {...register("organizationName", { required: "This field is requiredired" })}
                error={!!errors.organizationName} 
                helperText={errors.organizationName?.message} 
                fullWidth
            />
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                Website (optional)
            </Typography>
            <TextField fullWidth inputRef={websiteRef} placeholder='E.g. http://marriot.com'/>
            <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/welcome", nextPage:"/profile/locations" }}/>
        </Box>
    )
}

export default Basics