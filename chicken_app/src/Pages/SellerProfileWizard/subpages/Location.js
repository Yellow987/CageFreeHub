import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';


function Location(props) {
    return(
        <>
            <h2>Location(s)</h2>
            <div>
                <h3>Farm location</h3>
                <TextField
                    id="city"
                    label="City"
                    value={props.city}
                    placeholder='E.g. Beijing'
                    onChange={(event)=>props.setCity(event.target.value)}
                />
                <TextField
                    id="country"
                    label="Country"
                    value={props.country}
                    placeholder='Select country'
                    onChange={(event)=>props.setCountry(event.target.value)}
                />
            </div>
            <Button>+ I have an additional farm location.</Button>
        </>
    )
}

export default Location