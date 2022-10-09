import { Field } from 'react-final-form'
import { securityMessage } from '../components/other'
import RenderTextInput from '../components/RenderTextInput'
import RenderCheckboxes from '../components/RenderCheckboxes'

function Contact() {
    return (
        <>
            <h2>Contact person for purchase inquiries</h2>
            {securityMessage}
            <Field 
                label='Full name of contact'
                placeholder='E.g. Chung Lui'
                name='contact name'
                component={RenderTextInput}
            />
            <Field 
                label='Job title of contact'
                placeholder='E.g. CEO'
                name='contact job title'
                component={RenderTextInput}
            />
            <Field 
                label='Available contact channels'
                name='contact channels'
                options={['Phone','Whatsapp','WeChat']}
                component={RenderCheckboxes}
            />
        </>
    )
}

export default Contact