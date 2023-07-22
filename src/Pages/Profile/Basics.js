import { useOutletContext } from 'react-router';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Box } from '@mui/material';
import { useForm } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage';
import { useTranslation } from 'react-i18next';

function Basics() {
    const { t } = useTranslation(['sellerForm', 'validation'])
    const [setPage, saveData, data] = useOutletContext()
    const navigate = useNavigate()
    const websiteRef = useRef('')
    const { handleSubmit, getValues, formState: { errors }, register } = useForm({
        defaultValues: {
            organizationName: data.organizationName
        }
    })

    useEffect(() => {
        setPage( t('basics') )
        websiteRef.current.value = data.website
    }, [t, setPage, data.website, data.organizationName])

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
            <Typography variant="h1_32" >{t('basics')}</Typography>
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                {t('organization-name')}
            </Typography>
            <TextField 
                {...register("organizationName", { required: t('validation:this-field-is-required') })}
                error={!!errors.organizationName} 
                helperText={errors.organizationName?.message} 
                fullWidth
            />
            <Typography variant="label" sx={{ marginTop:4, marginBottom:1}}>
                {t('website-optional')}
            </Typography>
            <TextField fullWidth inputRef={websiteRef} />
            <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/welcome", nextPage:"/profile/locations" }}/>
        </Box>
    )
}

export default Basics