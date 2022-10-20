import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import countryList from 'react-select-country-list';
import React, { useMemo } from 'react'
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export function SelectSingleCountry(props) {
    const {country, setCountry, index} = props;
    const options = useMemo(() => countryList().getData(), [])
   return(
        <FormControl>
            <Select
            value={country}
            onChange={(e)=>setCountry(e.target.value, index)}
            placeholder='country'
            >
                {
                    options.map((country, countryIndex)=>{
                        return(
                            <MenuItem key={countryIndex} value={country.value}>{country.label}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>

    )
}

export function SelectMultipleCountries(props) {
    const {countries, setCountries } = props;
    const options = useMemo(() => countryList().getData(), [])
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setCountries(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
   return(
        <FormControl>
            <Select
            value={countries}
            onChange={(e)=>handleChange(e)}
            renderValue={(selected) => selected.join(', ')}
            multiple
            placeholder={'Select countries to which you distribute'}
            >
                {
                    options.map((item)=>{
                        return(
                            <MenuItem key={item.value} value={item.value}>
                                <Checkbox checked={countries.indexOf(item.value) > -1} />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>

    )
}


export function FarmLocation(props){
    const {locations} = props;
    console.log(locations[0])
    function setCity(cityName, index){
        console.log('index',index)
        locations[0][index].city = cityName
        locations[1]([...locations[0]])
    }
    function setCountry(countryName, index){
        locations[0][index].country = countryName
        locations[1]([...locations[0]])
    }
    return(
        <>
        {locations[0].map((location, index)=>{
            return(
                <Box
                key={index}
                style={{
                display:'flex', 
                justifyContent:'flex-start', 
                flexFlow:'column', 
                textAlign:'left',
                backgroundColor:'#F5F7F8',
                padding:'16px'
                }}
            >
                <InputLabel style={{margin:'0 0 10px 0'}}>
                    <Typography variant="label" >
                    City
                    </Typography>
                </InputLabel>
                <TextField 
                    variant="outlined"                                               
                    value={location.city} 
                    onChange={(e)=>setCity(e.target.value, index)}
                />
                <InputLabel style={{margin:'32px 0 10px 0'}}>
                    <Typography variant="label" >
                    Country
                    </Typography>
                </InputLabel>
                <SelectSingleCountry 
                        country={location.country} 
                        setCountry={setCountry}
                        index={index}
                    ></SelectSingleCountry>
            </Box>
          )
        })}
        <Button onClick={(e)=>{ locations[0].push({'city':'', 'country':''}); locations[1]([...locations[0]]); e.preventDefault()}} >+ I have an additional farm location</Button>
        </>
    )

}