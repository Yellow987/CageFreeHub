import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'

function RenderDropdown(props) {
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

export default RenderDropdown