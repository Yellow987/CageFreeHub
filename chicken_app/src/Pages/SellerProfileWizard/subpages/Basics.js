import { Field } from 'react-final-form'
import RenderTextInput from '../components/RenderTextInput'

function Basics() {
    return (
        <>
            <h2>Basics</h2>
            <Field
                name='organization'
                label='Organization name'
                placeholder='E.g. Happy Hens'
                component={RenderTextInput}
            />
            <Field
                name='website'
                label='Website (optional)'
                placeholder='E.g. http://marriot.com'
                component={RenderTextInput}
            />
        </>
    )
}

export default Basics