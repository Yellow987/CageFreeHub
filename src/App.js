import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import CssBaseline from '@mui/material/CssBaseline';
import ConfirmEmail from './Pages/Profile/ConfirmEmail';
import Theme from './Components/Theme';
import { AuthProvider } from './AuthContext'
//import PrivateRoute from './Components/PrivateRoute';
import Welcome from './Pages/Profile/Welcome';
import ProfileProgressBar from './Components/ProfileProgressBar';
import Basics from './Pages/Profile/Basics';
import Locations from './Pages/Profile/Locations';
import Contact from './Pages/Profile/Contact';
import ProductDetails from './Pages/Profile/ProductDetails';
import ProductionDetails from './Pages/Profile/ProductionDetails';
import Imagery from './Pages/Profile/Imagery';
import Profile from './Pages/Profile/Profile';
import Admin from './Pages/Admin';
function App() {
  return (
    <ThemeProvider theme={createTheme(Theme)}>
      <CssBaseline/>


      <AuthProvider> 
      <GlobalNavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/buyer-signup" element={<Signup props={{ hereTo: 'BuyerSignup' }}/>} />
          <Route path="/seller-signup" element={<Signup props={{ hereTo: 'SellerSignup' }}/>} />
          <Route path="/login" element={<Signup props={{ hereTo: 'Login' }}/> }/>
          <Route path="/profile/confirm-email" element={<ConfirmEmail/>} />
          <Route path='/profile/welcome' element={<Welcome />} />
          <Route element={<ProfileProgressBar />}>
            <Route path="/profile/basics" element={<Basics />} />
            <Route path="/profile/locations" element={<Locations />} />
            <Route path="/profile/contact" element={<Contact />} />
            <Route path="/profile/product-details" element={<ProductDetails />} />
            <Route path="/profile/production-details" element={<ProductionDetails />} />
            <Route path="/profile/imagery" element={<Imagery />} />
          </Route>
          <Route path="profile/:id" element={<Profile />}/>
          <Route path="*" element={<>404</>} />

        </Routes>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App