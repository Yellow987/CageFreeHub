import { Field } from 'react-final-form'
import { securityMessage, renderCheckboxes } from "../components"

function ProductDetails() {
    return (
        <>
            <h2>Product details</h2>
            {securityMessage}
            <Field
                label='Cage-free egg types'
                name='cage-free egg types'
                options={['Shell','Frozen','Liquid','Powder','Other']}
                component={renderCheckboxes}
            />
        </>
    )
}

export default ProductDetails