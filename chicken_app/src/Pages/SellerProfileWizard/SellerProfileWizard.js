import { Form } from 'react-final-form'
import { useState } from 'react'

import Basics from './subpages/Basics'
import Location from './subpages/Location'
import Contact from './subpages/Contact'
import ProductDetails from './subpages/ProductDetails'
import ProductionDetails1 from './subpages/ProductionDetails1'
import ProductionDetails2 from './subpages/ProductionDetails2'
import Imagery from './subpages/Imagery'
import {
    getFirestore, collection, addDoc
} from 'firebase/firestore'
import { PageWrapper } from './components/PageWrapper'

function SellerProfileWizard() {
    const [page, setPage] = useState(0)
    const [organizationName, setOrganizationName ] = useState('');
    const [website, setWebsite ] = useState('');
    const db = getFirestore();
    const colRef = collection(db, 'farms');

     

    function displayPage(page) {
        const pageIndex = {
            0: <Basics 
                    setOrganizationName={setOrganizationName}
                    organizationName={organizationName}
                    website={website}
                    setWebsite={setWebsite}
                />,
            1: <Location />,
            2: <Contact />,
            3: <ProductDetails />,
            4: <ProductionDetails1 />,
            5: <ProductionDetails2 />,
            6: <Imagery />
        }
        addDoc(colRef, {
                approved: false,
                certifyingbody: "",
                city: "",
                companyname: organizationName,
                country: "",
                distributioncountry:"",
                eggform:"",
                eggtypes: "",
                email: "",
                fullname: "",
                jobtitle: "",
                phonenumber: "",
                productionsystem: "",
                website: website
            
        })
        return (
            <PageWrapper
                element={pageIndex[page]}
                page={page}
                changePage={change => change === 'next' ? setPage(page + 1) : setPage(page - 1)}
            />
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

export default SellerProfileWizard