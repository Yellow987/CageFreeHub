import { Typography, TextField, Checkbox, FormControl, Select, MenuItem, InputLabel } from '@mui/material'

export const countries = ['China','Indonesia','Japan','Malaysia','Thailand']
export const securityMessage = <p>All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</p>

export function renderTextInput(props) {
    return (
        <div>
            <Typography><label>{props.label}</label></Typography>
            <TextField {...props.input} placeholder={props.placeholder} />
        </div>
    )
}

export function renderDropdown(props) {
    return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select {...props.input}>
            {props.options.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
            </Select>
        </FormControl>
    )
}

export function renderCheckbox(props) {
    return(
        <div>
            <Checkbox type='checkbox' {...props.input} />
            <label htmlFor={props.input.name}>{props.label}</label>
        </div>
    )
}

export function renderCheckboxes(props) {
    return (
        <div>
            <label>{props.label}</label>
            {props.options.map((option, idx) => (
                <>
                <div key={idx}>
                <Checkbox name={option} />
                <label htmlFor={option}>{option}</label>
                </div>
                </>
            ))}
        </div>
    )
}