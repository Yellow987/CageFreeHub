import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'
import { Typography, TextField, Box, Button, FormHelperText } from '@mui/material';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import NextBackPage from './../../Components/NextBackPage';
import Select from 'react-select'
import countryList from 'react-select-country-list'

function Locations() {
  const [setPage, saveData, data] = useOutletContext()
  const navigate = useNavigate()
  const { handleSubmit, control, getValues, formState: { errors }, register } = useForm({
    defaultValues: {
      distributionCountries: data.distributionCountries,
      locations: data.locations
    }
  })
  const {
    fields: locationsFields,
    append: locationsAppend,
    remove: locationsRemove
  } = useFieldArray({ control, name: "locations" });
  const options = useMemo(() => countryList().getData(), [])

  useEffect(() => {
    setPage("Location(s)")
  }, [setPage])


  function changePage(newPage) {
    saveData({ locations: getValues("locations"), distributionCountries: getValues("distributionCountries") })
    navigate(newPage)
  }

  const customSelectStyle = {
    control: base => ({
      ...base,
      minHeight: 48
    })
  };
  
  return (
    <Box sx={{ display:'flex', flexDirection:'column' }} component='form' onSubmit={handleSubmit(() => changePage("/profile/contact"))}>
      <Typography variant="h1_32" >Location(s)</Typography>
      <Typography variant="label" sx={{ marginTop:4 }} >Farm Location</Typography>
      {locationsFields.map((location, i) => (
        <Box key={location.id}>
          {i !== 0 && <Typography variant='label' sx={{ marginTop:3 }}>Additional Farm Location</Typography>}
          <Box sx={{ background:'#F5F7F8', padding:'16px', marginTop:1 }}>
            <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
              <Typography variant="label" >City</Typography>
              {i !== 0 && <Button sx={{ height:'24px' }} color='danger' variant='contained' disableElevation onClick={() => {locationsRemove(i)} }>Remove location</Button>}
            </Box>
            <TextField 
              fullWidth 
              sx={{ marginTop:1, marginBottom:2, background:'#FFFFFF' }}
              {...register(`locations.${i}.city`, { required:"This field is required" })}
              error={!!errors.locations?.[i]?.city}
              helperText={errors.locations?.[i]?.city?.message}
            />
            <Typography variant="label" style={{ marginBottom:'8px' }}>Country</Typography>
            <Controller 
              name={`locations.${i}.country`}
              control={control}
              rules={{ required: "This field is required"}}
              render={({ field }) => (
                <Select 
                  {...field}
                  value={field.value}
                  options={options}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  styles={customSelectStyle}
                  error={!!errors.locations?.[i]?.country}
                />
              )}
            />
            <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.locations?.[i]?.country?.message}</FormHelperText>
          </Box>
        </Box>
      ))}
      <Button sx={{ marginTop:3 }} onClick={() => { locationsAppend({ city: "", country: "" }) }}>
        <Typography variant='p_small'>+ I have an additional farm location</Typography>
      </Button>
      <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Distribution country (countries)</Typography>
      <Controller
        name="distributionCountries"
        control={control}
        rules={{ 
          validate: (v) => {
            if (!getValues("distributionCountries") || getValues("distributionCountries").length === 0) {
              return "This field is required"
            }
            return true
          }
        }}
        render={({ field }) => (
        <>
          <Select 
            {...field}
            isMulti
            styles={customSelectStyle}
            value={field.value}
            options={options}
            onChange={(selectedOption) => field.onChange(selectedOption)}
            error={!!errors.distributionCountries}
          />
          <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors.distributionCountries?.message}</FormHelperText>
        </>
        )}
      />
      <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/basics", nextPage:"/profile/contact" }}/>
    </Box>
  )
}

export default Locations