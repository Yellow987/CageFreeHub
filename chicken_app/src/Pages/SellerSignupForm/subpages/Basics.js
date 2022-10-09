import { Field } from 'react-final-form'
import { renderTextInput } from '../components'

function Basics() {
    return (
        <section>
            <h2>Basics</h2>
            <Field
                name='organization'
                label='Organization name'
                placeholder='E.g. Happy Hens'
                component={renderTextInput}
            />
            <Field
                name='website'
                label='Website (optional)'
                placeholder='E.g. http://marriot.com'
                component={renderTextInput}
            />
        </section>
    )
}

export default Basics