import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import  {getFarms} from './firestore';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import FormPart1 from './Pages/FormPart1';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './Components/Theme';

function App() {
  // let farms = getFarms();
  return (
    <ThemeProvider theme={createTheme(Theme)}>
      {/* //CssBaseline is important idk why */}
      <CssBaseline/>

      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/BuyerSignup" element={<Signup props={{ hereTo: 'BuyerSignup' }}/>} />
        <Route path="/SellerSignup" element={<Signup props={{ hereTo: 'SellerSignup' }}/>} />
        <Route path="/Login" element={<Signup props={{ hereTo: 'Login' }}/> }/>
        <Route path="/FormPart1" element={<FormPart1/>} />

      </Routes>
    </ThemeProvider>
  );
}

export default App