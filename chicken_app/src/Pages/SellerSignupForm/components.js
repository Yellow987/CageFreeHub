export const countries = ['China','Indonesia','Japan','Malaysia','Thailand']

export const securityMessage = <p>All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</p>

export function renderTextInput(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type='text' {...props.name} {...props.placeholder} />
        </div>
    )
}

export function renderDropdown(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type='select' {...props.name} {...props.placeholder} />
            {props.options.map(option => (
                <option key={option} name={option}>{option}</option>
            ))}
        </div>
    )
}

export function renderCheckboxes(props) {
    return (
        <div>
            <label>{props.label}</label>
            {props.options.map(option => (
                <input type='checkbox' name={option} key={option}>{option}</input>
            ))}
        </div>
    )
}