import React from 'react';
import { lazy, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Components/Theme';
import { AuthProvider } from './AuthContext'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Loading from './Components/Loading';
const ConfirmEmail = lazy(() => import('./Pages/ConfirmEmail'));
const Verified = lazy(() => import('./Pages/Verified'));
const PrivateRoute = lazy(() => import('./Components/PrivateRoute'));
const Welcome = lazy(() => import('./Pages/Profile/Welcome'));
const ProfileProgressBar = lazy(() => import('./Components/ProfileProgressBar'));
const Basics = lazy(() => import('./Pages/Profile/Basics'));
const BuyerSetup = lazy(() => import('./Pages/Profile/BuyerSetup'));
const Locations = lazy(() => import('./Pages/Profile/Locations'));
const Contact = lazy(() => import('./Pages/Profile/Contact'));
const ProductDetails = lazy(() => import('./Pages/Profile/ProductDetails'));
const ProductionDetails = lazy(() => import('./Pages/Profile/ProductionDetails'));
const Imagery = lazy(() => import('./Pages/Profile/Imagery'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const Admin = lazy(() => import('./Pages/Admin'));
const Sellers = lazy(() => import('./Pages/Sellers'));
const BuyerProfile = lazy(() => import('./Pages/BuyerProfile'));
const Verify = lazy(() => import('./Pages/Verify'));

function App() {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <AuthProvider> 
        <CssBaseline/>
        <GlobalNavBar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<PrivateRoute props={{ onPublicPage: true }}><Home/></PrivateRoute>} /> 
            <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
            <Route path="/buyer-signup" element={<PrivateRoute props={{ onPublicPage: true }}><Signup props={{ hereTo: 'BuyerSignup' }}/></PrivateRoute>} />
            <Route path="/seller-signup" element={<PrivateRoute props={{ onPublicPage: true }}><Signup props={{ hereTo: 'SellerSignup' }}/></PrivateRoute>} />
            <Route path="/seller-signup/claim-profile/:claimProfileID" element={<PrivateRoute props={{ onPublicPage: true, redirect:false }}><Signup props={{ hereTo: 'SellerSignup', claimProfile:true }}/></PrivateRoute>} />
            <Route path="/login" element={<PrivateRoute props={{ onPublicPage: true}}><Signup props={{ hereTo: 'Login' }}/> </PrivateRoute>}/>
            <Route path="/confirm-email" element={<PrivateRoute props={{ allowBuyers: true }}><ConfirmEmail/></PrivateRoute>} />
            <Route path="/verified" element={<PrivateRoute props={{ allowBuyers: true }}><Verified/></PrivateRoute>} />
            <Route path="/verify" element={<Verify/>} />
            <Route path='/profile/welcome' element={<PrivateRoute props={{ allowSellers: true }}><Welcome /></PrivateRoute>} />
            <Route element={<PrivateRoute props={{ allowSellers: true }}><ProfileProgressBar /></PrivateRoute>}>
              <Route path="/profile/basics" element={<Basics />} />
              <Route path="/profile/locations" element={<Locations />} />
              <Route path="/profile/contact" element={<Contact />} />
              <Route path="/profile/product-details" element={<ProductDetails />} />
              <Route path="/profile/production-details" element={<ProductionDetails />} />
              <Route path="/profile/imagery" element={<Imagery />} />
            </Route>
            <Route path="/buyer-setup" element={<PrivateRoute props={{ allowBuyers: true }}><BuyerSetup/></PrivateRoute>} />
            <Route path="/buyer-profile/:id" element={<PrivateRoute><BuyerProfile/></PrivateRoute>} />
            <Route path="profile/:id" element={<Profile />}/> {/* //privated in the page */}
            <Route path="sellers" element={<PrivateRoute props={{ allowBuyers: true, BuyerNeedsApprovalToSeeSellers: true }}><Sellers /></PrivateRoute>}/>
            <Route path="*" element={<>404</>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;