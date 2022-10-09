import { Field } from "react-final-form"
import { Button } from "@mui/material"
import RenderDropdown from "../components/RenderDropdown"
import RenderTextInput from "../components/RenderTextInput"

function ProductionDetails2() {
    return (
        <>
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
                component={RenderDropdown}
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
                component={RenderDropdown}
            />
            <Field 
                label='Title of certifying organization'
                placeholder='E.g. The Humane Society'
                name='certifying organzation'
                component={RenderTextInput}
            />
            <Button>Upload certificate</Button>
        </>
    )
}

export default ProductionDetails2