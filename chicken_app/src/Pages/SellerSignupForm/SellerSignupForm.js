import { Form } from 'react-final-form'

import Basics from './subpages/Basics'
import Location from './Location'
import Contact from './Contact'
import ProductDetails from './subpages/ProductDetails'
import ProductionDetails1 from './ProductionDetails1'
import ProductionDetails2 from './ProductionDetails2'

function SellerSignupForm() {
    return(
        <>
        <Form
            render={({ handleSubmit }) => {
                <>
                <Basics />
                <Location />
                <Contact />
                <ProductDetails />
                <ProductionDetails1 />
                <ProductionDetails2 />
                <Imagery />
                </>
            }}
            />
        </>
    )
}

export default SellerSignupForm