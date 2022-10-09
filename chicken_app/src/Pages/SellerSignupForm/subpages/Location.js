import { Field } from 'react-final-form'
import { Button } from '@mui/material'
import { renderTextInput, renderDropdown, countries } from "../components"

function Location() {
    return(
        <>
            <h2>Location(s)</h2>
            <div>
                <h3>Farm location</h3>
                <Field 
                    name='city'
                    label='City'
                    placeholder='E.g. Beijing'
                    component={renderTextInput}
                />
                <Field 
                    name='country'
                    label='Country'
                    placeholder='Select country'
                    options={countries}
                    component={renderDropdown}
                >
                </Field>
            </div>
            <Button>+ I have an additional farm location.</Button>
            <Field 
                name='distributionCountries'
                label='Distribution country (countries)'
                placeholder='Select countries to which you distribute'
                // multiple
                options={countries}
                component={renderDropdown}
            />
        </>
    )
}

export default Location