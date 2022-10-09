import { Field } from 'react-final-form'
import { securityMessage } from "../../Components/formComponents"

function ProductDetails() {
    return (
        <section>
            <h2>Product details</h2>
            {securityMessage}
            <Field
                label='Cage-free egg types'
                name='cage-free egg types'
                options={['Shell','Frozen','Liquid','Powder','Other']}
                component={renderCheckboxes}
            />
        </section>
    )
}

export default ProductDetails