import { Field } from 'react-final-form'
import { renderTextInput, renderDropdown, countries } from "../../Components/formComponents"

function Location() {
    return(
        <section>
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
            <button>+ I have an additional farm location.</button>
            <Field 
                name='distributionCountries'
                label='Distribution country (countries)'
                placeholder='Select countries to which you distribute'
                multiple
                options={countries}
            />
        </section>
    )
}

export default Location