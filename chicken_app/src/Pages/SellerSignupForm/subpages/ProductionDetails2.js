import { Field } from "react-final-form"
import { Button } from "@mui/material"
import { renderDropdown, renderTextInput } from "../components"

function ProductionDetails2() {
    return (
        <section>
            <h2>Production details</h2>
            <Field 
                label='Production system of farm(s)'
                name='production system'
                options={[
                    'Aviary: multi-level cage-free system',
                    'Barn: single-level cage-free system',
                    'Fixed housing: structure does not move',
                    'Free range: cage free system that provides outdoor access',
                    'Mobile unit: house or structure on wheels'
                ]}
                component={renderDropdown}
            />
            <Field 
                label='Do you have cage-free egg certification?'
                placeholder='Select your certification status'
                name='certification status'
                options={[
                    'Yes, we are certified',
                    'z',
                    `No, we don't ever plan on becoming certified`
                ]}
                component={renderDropdown}
            />
            <Field 
                label='Title of certifying organization'
                placeholder='E.g. The Humane Society'
                name='certifying organzation'
                component={renderTextInput}
            />
            <Button>Upload certificate</Button>
        </section>
    )
}

export default ProductionDetails2