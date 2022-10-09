import { Field } from 'react-final-form'
import { securityMessage, renderTextInput, renderCheckbox, renderDropdown } from "../components"

function ProductionDetails1() {
    return (
        <section>
            <h2>Production details</h2>
            {securityMessage}
            <h3>Cage-free egg types</h3>
            {['shell', 'frozen','liquid','powder','other'].map(eggType => {
            return (
                <div key={eggType}>
                    <Field
                        name={eggType}
                        label={eggType[0].toUpperCase() + eggType.slice(1)}
                        component={renderCheckbox}
                    />

                    <Field 
                        label='Total production capacity (per year)'
                        name={`${eggType} total production capacity`}
                        placeholder={eggType === 'shell'? 'E.g. 10,000' : 'E.g. 3'}
                        component={renderTextInput}
                    />
                    
                    <Field
                        name={`${eggType} total production capacity unit`}
                        type='select'
                        options={['eggs','tons','kilograms']}
                        render={renderDropdown}
                    />
                    
                    <Field 
                        label='Price per ton'
                        name={`${eggType} price per ton`}
                        placeholder='$'
                        component={renderTextInput}
                    />

                    <Field
                        name={`${eggType} price per ton currency`}
                        options={['$']}
                        component={renderDropdown}
                    />
                </div>
                )
            })}
                
        </section>
    )
}

export default ProductionDetails1