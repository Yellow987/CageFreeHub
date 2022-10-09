import { Field } from 'react-final-form'
import { securityMessage, renderTextInput } from "../../Components/formComponents"

function ProductionDetails1() {
    return (
        <section>
            <h2>Production details</h2>
            {securityMessage}
            <h3>Cage-free egg types</h3>
            {['shell', 'frozen','liquid','powder','other'].map(eggType => {
            return (
                <div key={eggType}>
                    <Field type='checkbox' name={eggType} />{eggType[0].toUpperCase() + eggType.slice(1)}

                    <Field 
                        label='Total production capacity (per year)'
                        name={`${eggType} total production capacity`}
                        placeholder={eggType === 'shell'? 'E.g. 10,000' : 'E.g. 3'}
                        component={renderTextInput}
                    />

                    <Field name={`${eggType} total production capacity unit`} type='select'>
                        <option value='eggs'>Eggs</option>
                        <option value='tons' selected>Tons</option>
                        <option value='kilograms'>Kilograms</option>
                    </Field>

                    <Field 
                        label='Price per ton'
                        name={`${eggType} price per ton`}
                        placeholder='$'
                        component={renderTextInput}
                    />

                    <Field name={`${eggType} price per ton currency`} type='select'>
                        <option>USD</option>
                    </Field>
                </div>
                )
            })}
                
        </section>
    )
}

export default ProductionDetails1