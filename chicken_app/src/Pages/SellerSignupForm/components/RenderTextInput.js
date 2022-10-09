import { Typography, TextField } from '@mui/material'

function RenderTextInput(props) {
    return (
        <div>
            <Typography><label>{props.label}</label></Typography>
            <TextField {...props.input} placeholder={props.placeholder} />
        </div>
    )
}

export default RenderTextInput