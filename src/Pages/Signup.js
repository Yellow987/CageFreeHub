import { React, useState } from 'react'
import { Box, Typography, TextField, Checkbox, FormControlLabel, FormHelperText, Link as MuiLink } from '@mui/material'
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useTranslation, Trans } from 'react-i18next';
import tosPDF from '../Media/terms_of_service.pdf'
import { copyOverClaimedProfile } from '../firestore';
import { isAdmin } from '../AdminAccountsConfig';
import { sendVerificationEmail } from './../firestore';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Signup(props) {
  const { hereTo, claimProfile = false } = props.props
  const format = {
    marginTop:4, 
  }
  const hyperlink = {
    fontWeight:'Bold',
    display:"inline",
    color:'primary.main',
    textDecoration: "none",
  }

  const { t } = useTranslation(['signup']);
  const { signup, login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState({ isAuthError:false, errorDetails:""})
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    ...(hereTo !== 'Login' ? {tosCheckbox: yup.bool().required("Please accept the terms of service.").oneOf([true], "Please accept the terms of service.")} : {})
  });
  const { 
    handleSubmit, 
    register, 
    getValues,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema),
  })
  let { claimProfileID } = useParams()
  const navigate = useNavigate()

  function handleAuth(event) {
    event.preventDefault()
    setLoading(true)
    if (hereTo === "Login") {
      login(getValues('email'), getValues('password')).then((user) => {
        if (isAdmin(user.user.uid)) {
          navigate('/admin')
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setAuthError({ isAuthError:true, errorDetails:"Invalid username or password."})
        }
      })
    } else {
      let data = {
        isSeller: hereTo === "SellerSignup",
        isProfileComplete: false,
        isApprovedToViewSellers: false
      }
      signup(getValues('email'), getValues('password'), data)
      .then((user) => {
        if (claimProfile) {
          copyOverClaimedProfile(claimProfileID, user.uid).then(() => {
            navigate('profile')
          })
        }
        if (hereTo === "BuyerSignup") {
          sendVerificationEmail()
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setAuthError({ isAuthError:true, errorDetails:"This email is already taken"})
        }
      })
    }
    setLoading(false)
  }

  function getTitle(hereTo) {
    switch(hereTo) {
      case 'Login':
        return t('loginTitle')
      case 'SellerSignup':
        return t('signupSellerTitle');
      case 'BuyerSignup':
        return t('signupBuyerTitle')
      default: 
        return 'Error'
    }
  }

  return (
    <Box 
      align='center' 
      mx={{ sm:'auto', xs:'24px' }} 
      sx={{ maxWidth:'430px', mt:{ sm:'116px', xs:'24px'} }}
      component='form' 
      onSubmit={handleSubmit((data, e) => handleAuth(e))}
    >
      <Typography variant='h1'>
        {getTitle(hereTo)}
      </Typography>
      <Alert severity='error' style={{display: authError.isAuthError ? "flex" : "none", marginTop:'16px' }}>
        <Typography>{authError.errorDetails}</Typography>
      </Alert>
      <TextField 
        error={!!errors.email} 
        helperText={errors.email?.message} 
        fullWidth 
        label={t('email')} 
        variant="outlined" 
        sx={{ ...format }} 
        {...register("email", { required:"Please enter a valid email" })}
      />
      <TextField 
        error={!!errors.password} 
        helperText={errors.password?.message} 
        fullWidth 
        label={t('password')} 
        type="password" 
        autoComplete="on" 
        variant="outlined" 
        sx={{ ...format }} 
        {...register("password", { required:"password must be at least 6 characters" })}
      />
      <Controller
        name="tosCheckbox"
        control={control}
        rules={{ 
          validate: (checked) => {
            if (!checked && hereTo !== "Login") {
              return "Please accept the terms of service"
            }
            return true
          }
        }}
        render={({ field }) => (
          <Box sx={{ display: hereTo === 'Login' ? 'none' : 'block' }}>
            <FormControlLabel sx={{ ...format, lineHeight:0 }}
              label={
                <Typography variant='p_small' display="inline">
                  <Trans 
                    i18nKey='ToS' 
                    t={t} 
                    components={[
                      <MuiLink
                        sx={{...hyperlink, wordBreak:"normal"}}
                        href={tosPDF} 
                        target='_blank' 
                        rel='noopener noreferrer'
                      />
                    ]} 
                  />
                </Typography>
              } control={
                <Checkbox 
                  {...field}
                  onChange={() => { field.onChange(!getValues("tosCheckbox")); } }
                />
              }
            />
            <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.tosCheckbox?.message}</FormHelperText>
          </Box>
        )}
      />
      <Button 
        type="submit" 
        disabled={loading} 
        fullWidth 
        variant='contained' 
        sx={{ ...format, fontWeight:700 }} 
      >
        <CircularProgress size="1.5rem" sx={{ display: loading ? 'block' : 'none' }}/>
        {!loading ? hereTo === 'Login' ? t('login') : t('createAccount') : ""}
      </Button>
      <Typography variant='p_default' sx={{marginTop: 5, display: hereTo === 'Login' ? 'none' : 'block' }}>
        <Trans i18nKey='haveAccount' t={t} components={[<Box sx={{...hyperlink}} component={Link} to="/Login" />]} />
      </Typography>
      <Box  sx={{ display: hereTo === 'Login' ? 'block' : 'none' }}>
        <Typography variant='p_default' sx={{marginTop: 5, marginBottom: 1}}>
          {t('noAccount')}
        </Typography>
        <Typography variant='p_default' component={Link} to="/seller-signup" sx={{ ...hyperlink, marginTop:1 }}>
          {t('signupSeller')}
        </Typography>
        <Typography variant='p_default' sx={{ ...hyperlink }}> · </Typography>
        <Typography variant='p_default' component={Link} to="/buyer-signup" sx={{ ...hyperlink }}>
          {t('signupBuyer')}
        </Typography>
      </Box>
      <Typography variant='p_default' sx={{marginTop: 2, display: hereTo === 'SellerSignup' ? 'block' : 'none' }}>
        <Trans i18nKey="hereToBuyInstead" t={t} components={[<Box sx={{...hyperlink}} component={Link} to="/buyer-signup" />]} />
      </Typography>
      <Typography variant='p_default' sx={{marginTop: 2, display: hereTo === 'BuyerSignup' ? 'block' : 'none' }}>
        <Trans i18nKey='hereToSellInstead' t={t} components={[<Box sx={{...hyperlink}} component={Link} to="/seller-signup" />]} />
      </Typography>
    </Box>
  )
}

export default Signup