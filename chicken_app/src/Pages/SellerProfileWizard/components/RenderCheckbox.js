import { Checkbox } from "@mui/material"

function RenderCheckbox(props) {
    return(
        <div>
            <Checkbox type='checkbox' {...props.input} />
            <label htmlFor={props.input.name}>{props.label}</label>
        </div>
    )
}

export default RenderCheckbox