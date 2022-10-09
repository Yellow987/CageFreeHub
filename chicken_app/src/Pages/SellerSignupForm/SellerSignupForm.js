import { Form } from 'react-final-form'
import { useState } from 'react';
import Button from '@mui/material/Button';

import Basics from './subpages/Basics'
import Location from './subpages/Location'
import Contact from './subpages/Contact'
import ProductDetails from './subpages/ProductDetails'
import ProductionDetails1 from './subpages/ProductionDetails1'
import ProductionDetails2 from './subpages/ProductionDetails2'
import Imagery from './subpages/Imagery'
import { PageWrapper } from './components';

function SellerSignupForm() {
    const [page, setPage] = useState(0)

    function displayPage(page) {
        const pageIndex = {
            0: <Basics />,
            1: <Location />,
            2: <Contact />,
            3: <ProductDetails />,
            4: <ProductionDetails1 />,
            5: <Imagery />
        }
        return (
            <PageWrapper
                element={pageIndex[page]}
                page={page}
                changePage={change => change === 'next' ? setPage(page + 1) : setPage(page - 1)}/>
        )
    }

    function onSubmit(formValues) {
        console.log(formValues)
    }

    return(
        <>
        <div>Progress Bar</div>
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {displayPage(page)}
                </form>
            )}
            />
        </>
    )
}

export default SellerSignupForm