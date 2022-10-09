import { Checkbox } from "@mui/material"

function RenderCheckboxes(props) {
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

export default RenderCheckboxes