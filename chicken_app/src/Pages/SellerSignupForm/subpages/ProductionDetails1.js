import { Field } from 'react-final-form'
import { securityMessage } from '../components/other'
import RenderCheckbox from '../components/RenderCheckbox'
import RenderTextInput from '../components/RenderTextInput'
import RenderDropdown from '../components/RenderDropdown'

function ProductionDetails1() {
    return (
        <>
            <h2>Production details</h2>
            {securityMessage}
            <h3>Cage-free egg types</h3>
            {['shell', 'frozen','liquid','powder','other'].map(eggType => {
            return (
                <div key={eggType}>
                    <Field
                        name={eggType}
                        label={eggType[0].toUpperCase() + eggType.slice(1)}
                        component={RenderCheckbox}
                    />

                    <Field 
                        label='Total production capacity (per year)'
                        name={`${eggType} total production capacity`}
                        placeholder={eggType === 'shell'? 'E.g. 10,000' : 'E.g. 3'}
                        component={RenderTextInput}
                    />
                    
                    <Field
                        name={`${eggType} total production capacity unit`}
                        type='select'
                        options={['eggs','tons','kilograms']}
                        render={RenderDropdown}
                    />
                    
                    <Field 
                        label='Price per ton'
                        name={`${eggType} price per ton`}
                        placeholder='$'
                        component={RenderTextInput}
                    />

                    <Field
                        name={`${eggType} price per ton currency`}
                        options={['$']}
                        component={RenderDropdown}
                    />
                </div>
                )
            })}
                
        </>
    )
}

export default ProductionDetails1