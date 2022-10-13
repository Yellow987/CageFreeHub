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
import SellerBasics from './Pages/Profile/SellerBasics';

function App() {
  return (
    <ThemeProvider theme={createTheme(Theme)}>
      <CssBaseline/>


      <AuthProvider> 
      <GlobalNavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/buyer-signup" element={<Signup props={{ hereTo: 'BuyerSignup' }}/>} />
          <Route path="/seller-signup" element={<Signup props={{ hereTo: 'SellerSignup' }}/>} />
          <Route path="/login" element={<Signup props={{ hereTo: 'Login' }}/> }/>
          <Route path="/profile/confirm-email" element={<ConfirmEmail/>} />
          <Route path='/profile' element={<Welcome />} />
          <Route path="/profile" element={<ProfileProgressBar />}>
            <Route path="/profile/basics" element={<SellerBasics />} />
          </Route>
          <Route path="*" element={<>404</>} />

        </Routes>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App