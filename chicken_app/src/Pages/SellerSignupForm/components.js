export const countries = ['China','Indonesia','Japan','Malaysia','Thailand']

export const securityMessage = <p>All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</p>

export function renderTextInput(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type='text' name={props.input.name} placeholder={props.placeholder} />
        </div>
    )
}

export function renderDropdown(props) {
    return (
        <div>
            <label>{props.label}</label>
            <select name={props.input.name} placeholder={props.placeholder}>
            {props.options.map(option => (
                <option key={option} name={option}>{option}</option>
            ))}
            </select>
        </div>
    )
}

export function renderCheckbox(props) {
    return(
        <div>
            <input type='checkbox' name={props.input.name} />
            <label htmlFor={props.input.name}>{props.label}</label>
        </div>
    )
}

export function renderCheckboxes(props) {
    return (
        <div>
            <label>{props.label}</label>
            {props.options.map(option => (
                <>
                <div key={option}>
                <input type='checkbox' name={option} key={option} />
                <label htmlFor={option}>{option}</label>
                </div>
                </>
            ))}
        </div>
    )
}