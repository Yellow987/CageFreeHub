import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import countryList from 'react-select-country-list'
import { useState } from 'react'

function SelectCountry(props) {
    let countryList = countryList().getData(); //in the sample they use useMemo why?
   console.log(countryList)
   const [country, setCountry] = useState('');
   return(
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Country</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={country}
  label="Country"
  onChange={setCountry}
>
    {
        countryList.map((country)=>{
            <MenuItem value={country.code}>{country.label}</MenuItem>
        })
    }
  
  <MenuItem value={20}>Twenty</MenuItem>
  <MenuItem value={30}>Thirty</MenuItem>
</Select>
</FormControl>

)
}

export default SelectCountry