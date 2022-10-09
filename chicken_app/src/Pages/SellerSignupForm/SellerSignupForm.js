import { Form } from 'react-final-form'
import Button from '@mui/material/Button';

import Basics from './subpages/Basics'
import Location from './subpages/Location'
import Contact from './subpages/Contact'
import ProductDetails from './subpages/ProductDetails'
import ProductionDetails1 from './subpages/ProductionDetails1'
import ProductionDetails2 from './subpages/ProductionDetails2'
import Imagery from './subpages/Imagery'

function SellerSignupForm() {
    function onSubmit(formValues) {
        console.log(formValues)
    }

    return(
        <>
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Basics />
                    <Location />
                    <Contact />
                    <ProductDetails />
                    <ProductionDetails1 />
                    <ProductionDetails2 />
                    <Imagery />
                    <Button type='submit'>Submit</Button>
                </form>
            )}
            />
        </>
    )
}

export default SellerSignupForm