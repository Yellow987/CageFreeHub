import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import  {getFarms} from './firestore';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      light: '#EFFAF9',
      main: '#3FAB94',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function App() {
  // let farms = getFarms();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App