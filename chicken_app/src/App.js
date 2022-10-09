import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import SellerBasics from './Pages/SellerBasics';
import CssBaseline from '@mui/material/CssBaseline';
import ConfirmEmail from './Pages/ConfirmEmail';
import Theme from './Components/Theme';
import { AuthProvider } from './AuthContext'
import SellerProfileWizard from './Pages/SellerProfileWizard/SellerProfileWizard';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={createTheme(Theme)}>
      <CssBaseline/>


      <AuthProvider> 
      <GlobalNavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/BuyerSignup" element={<Signup props={{ hereTo: 'BuyerSignup' }}/>} />
          <Route path="/SellerSignup" element={<Signup props={{ hereTo: 'SellerSignup' }}/>} />
          <Route path="/Login" element={<Signup props={{ hereTo: 'Login' }}/> }/>
          <Route path="/SellerBasics" element={<SellerBasics/>} />
          <Route path="/ConfirmEmail" element={<ConfirmEmail/>} />
          <Route path="/SellerProfileWizard" element={<PrivateRoute><SellerProfileWizard /></PrivateRoute>} />
          <Route path="*" element={<>404</>} />

        </Routes>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App