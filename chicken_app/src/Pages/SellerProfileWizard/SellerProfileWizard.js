import { Form } from 'react-final-form'
import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import Basics from './subpages/Basics'
import Location from './subpages/Location'
import Contact from './subpages/Contact'
import ProductDetails from './subpages/ProductDetails'
import ProductionDetails1 from './subpages/ProductionDetails1'
import SelectCountry from './components/CountrySelect'
import ProductionDetails2 from './subpages/ProductionDetails2'
import Imagery from './subpages/Imagery'
import { HashRouter, Route } from 'react-router-dom';
import {
    getFirestore, doc, setDoc
} from 'firebase/firestore'
import { PageWrapper } from './components/PageWrapper'

function SellerProfileWizard() {
    <HashRouter>
    <Route
      exact
      path='/SellerProfileWizard/ProductDetails'
      component={ProductDetails}
    />
    <Route
      exact
      path='/posts'
      component={ProductionDetails1}
    />
  </HashRouter>
    const [page, setPage] = useState(0)
    const [organizationName, setOrganizationName ] = useState('');
    const [website, setWebsite ] = useState('');
    const [city, setCity ] = useState('');
    const [country, setCountry ] = useState('');
    const [distCountry, setDistCountry ] = useState('');



    const db = getFirestore();
    const { currentUser } = useAuth();
    async function sendData(){
        let data = {
                approved: false,
                certifyingbody: "",
                city: city,
                companyname: organizationName,
                country: country,
                distributioncountry:distCountry,
                eggform:"",
                eggtypes: "",
                email: "",
                fullname: "",
                jobtitle: "",
                phonenumber: "",
                productionsystem: "",
                website: website
            }
        await setDoc(doc(db, "farms", currentUser.uid), data);
    }

    function displayPage(page, dataUpdateFunction) {
        const pageIndex = {
            0: <Basics 
                    setOrganizationName={setOrganizationName}
                    organizationName={organizationName}
                    website={website}
                    setWebsite={setWebsite}
                />,
            1: <Location 
                    setCity={setCity}
                    city={city}
                    country={country}
                    setCountry ={setCountry}
                    setDistCountry={setDistCountry}
                    distCountry={distCountry}
                />,
            2: <Contact />,
            3: <ProductDetails />,
            4: <ProductionDetails1 />,
            5: <ProductionDetails2 />,
            6: <Imagery />
        }
        return (
            <PageWrapper
                element={pageIndex[page]}
                page={page}
                changePage={change => change === 'next' ? setPage(page + 1) : setPage(page - 1)}
                dataUpdateFunction={dataUpdateFunction}
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
                    {displayPage(page, sendData)}
                </form>
            )}
            />
        </>
    )
}

export default SellerProfileWizard