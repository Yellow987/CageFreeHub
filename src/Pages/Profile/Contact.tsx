import React from 'react';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Alert, FormGroup, TextField, Typography, FormControlLabel, Checkbox, FormHelperText } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage';
import { ContactChannels } from '../../firestore';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Contact() {
    const [setPage, saveData, data] = useOutletContext<Array<any>>();
    interface FormErrors {
      contactMethods?: {
        message: string
      }
    }
    interface FormValues {
      fullName: string;
      jobTitle: string;
      email: string;
      phone: string;
      whatsapp: string;
      wechat: string;
      contactMethods: {
        email: boolean;
        phone: boolean;
        whatsapp: boolean;
        wechat: boolean;
      };
    }
    const defaultValues: FormValues = {
      fullName: data.name,
      jobTitle: data.jobTitle,
      email: data.contactChannels?.email ?? '',
      phone: data.contactChannels?.phone ?? '',
      whatsapp: data.contactChannels?.whatsapp ?? '',
      wechat: data.contactChannels?.wechat ?? '',
      contactMethods: {
        email: !!data.contactChannels?.email,
        phone: !!data.contactChannels?.phone, 
        whatsapp: !!data.contactChannels?.whatsapp, 
        wechat: !!data.contactChannels?.wechat
      },
    };
    const schema = yup.object().shape({
      fullName: yup.string().required(),
      jobTitle: yup.string(),
      email: yup.string().when('contactMethods.email', {
        is: true,
        then: yup.string().required('Please enter a valid email address').email('Please enter a valid email address'),
      }),
      phone: yup
        .string()
        .test('phone', 'Please enter a valid number', function (value) {
          return !this.parent.contactMethods.phone || isPossiblePhoneNumber('+' + value)
        }),
      whatsapp: yup
        .string()
        .test('whatsapp', 'Please enter a valid number', function (value) {
          return !this.parent.contactMethods.whatsapp || isPossiblePhoneNumber('+' + value)
        }),
      wechat: yup
        .string()
        .test('wechat', 'Please enter a valid number', function (value) {
          return !this.parent.contactMethods.wechat || isPossiblePhoneNumber('+' + value)
        }),
      contactMethods: yup
        .object()
        .test('contactMethods', 'At least one contact method must be selected', (value) => {
          return Object.values(value).some((v) => v === true);
        }),
    });
    const { 
      control,
      handleSubmit, 
      watch,
      setValue,
      register, 
      getValues,
      formState: { errors }
    } = useForm<FormValues, FormErrors>({
      defaultValues: defaultValues,
      resolver: yupResolver(schema),
    })
    const phoneCommunicationChannels: (keyof ContactChannels)[] = ["phone", "whatsapp", "wechat"]
    const communicationChannelNames = {email: "Email", phone: "Phone", whatsapp: "Whatsapp", wechat: "Wechat"}
    const watchContactMethods = watch('contactMethods')

    const navigate = useNavigate()
    useEffect(() => {
        setPage('Contact')
    }, [data, setPage])
  
    function changePage(newPage: string) {
      saveData({
        name: getValues("fullName"), 
        jobTitle: getValues("jobTitle"), 
        contactChannels: {
          email: getValues('contactMethods.email') ? getValues('email') : '',
          phone:  getValues('contactMethods.phone') ? getValues('phone') : '',
          whatsapp: getValues('contactMethods.whatsapp') ? getValues('whatsapp') : '',
          wechat: getValues('contactMethods.wechat') ? getValues('wechat') : '',
        }
      })
      navigate(newPage)
    }

    return(
      <Box sx={{ display:'flex', flexDirection:'column' }} component='form' onSubmit={handleSubmit(() => changePage("/profile/product-details"))}>
        <Typography variant="h1_32" >Contact person for purchase inquiries</Typography>
        <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
          <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
        </Alert>
        <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Full Name of Contact</Typography>
        <TextField 
          {...register("fullName", { required:"This field is required" })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
        <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Job title of contact (optional)</Typography>
        <TextField {...register("jobTitle")}/>
        <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Available contact channels</Typography>
        <FormGroup>
        <Box>
          <FormControlLabel 
            control={
              <Checkbox 
                checked={!!watchContactMethods['email']}
                onClick={() => {
                  setValue( 'contactMethods.email', !getValues('contactMethods.email') )
                }}
              />
            } 
            label={communicationChannelNames['email']}
          />
          {!!watchContactMethods['email'] && 
            <>
              <TextField 
                {...register("email")}
                error={!!errors.email}
                fullWidth
              />
              <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.email?.message}</FormHelperText>
            </>
          }
        </Box>
          {phoneCommunicationChannels.map((communicationChannel, index) => (
            <Box key={index}>
              <FormControlLabel 
                control={
                  <Checkbox 
                    checked={!!watchContactMethods[communicationChannel]} 
                    onClick={() => {
                      setValue( `contactMethods.${communicationChannel}`, !watchContactMethods[communicationChannel] )
                    }}
                  />
                } 
                label={communicationChannelNames[communicationChannel]}
              />
              {!!watchContactMethods[communicationChannel] && 
                <Controller
                  name={communicationChannel}
                  control={control}
                  render={({ field }) => (
                    <>
                      <PhoneInput 
                        country='us'
                        placeholder={`Enter ${communicationChannelNames[communicationChannel]} number`} 
                        value={ getValues(communicationChannel) } 
                        onChange={(v) => { field.onChange(v) }} 
                        preferredCountries={['cn','in','id','jp','my','ph','th']} 
                        enableSearch
                      />
                      <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors[communicationChannel]?.message}</FormHelperText>
                    </>
                  )}
                />
              }
            </Box>
          ))}
        </FormGroup>
        <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors?.contactMethods?.message}</FormHelperText>
        <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/locations", nextPage:"/profile/product-details" }}/>
      </Box>
    )
}

export default Contact