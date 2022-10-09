import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import  {getFarms} from './firestore';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import SellerBasics from './Pages/SellerBasics';
import CssBaseline from '@mui/material/CssBaseline';
import ConfirmEmail from './Pages/ConfirmEmail';
import Theme from './Components/Theme';
import { AuthProvider } from './AuthContext'
import SellerSignupForm from './Pages/SellerSignupForm/SellerSignupForm';

function App() {
  // let farms = getFarms();
  return (
    <ThemeProvider theme={createTheme(Theme)}>
      {/* //CssBaseline is important idk why */}
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
          <Route path="/SellerSignupForm" element={<SellerSignupForm />} />
          <Route path="*" element={<>404</>} />

        </Routes>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App