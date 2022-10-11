import { Field } from 'react-final-form'
import RenderTextInput from '../components/RenderTextInput'

import TextField from '@mui/material/TextField';
function Basics(props) {

    console.log(props)
    return (
        <>
            <h2>Basics</h2>
            <TextField
                id="organization-name"
                label="Organization name"
                value={props.organizationName}
                placeholder='E.g. Happy Hens'
                onChange={(event)=>props.setOrganizationName(event.target.value)}
            />
            <TextField
                id="website"
                label="Website (optional)"
                value={props.website}
                placeholder='E.g. http://marriot.com'
                onChange={(event)=>props.setWebsite(event.target.value)}
            />
        </>
    )
}

export default Basics