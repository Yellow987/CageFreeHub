import { Field } from 'react-final-form'
import { renderTextInput, renderCheckboxes, securityMessage } from '../components'

function Contact() {
    return (
        <section>
            <h2>Contact person for purchase inquiries</h2>
            {securityMessage}
            <Field 
                label='Full name of contact'
                placeholder='E.g. Chung Lui'
                name='contact name'
                component={renderTextInput}
            />
            <Field 
                label='Job title of contact'
                placeholder='E.g. CEO'
                name='contact job title'
                component={renderTextInput}
            />
            <Field 
                label='Available contact channels'
                name='contact channels'
                options={['Phone','Whatsapp','WeChat']}
                component={renderCheckboxes}
            />
        </section>
    )
}

export default Contact