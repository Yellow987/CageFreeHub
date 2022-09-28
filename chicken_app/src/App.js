import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import  {getFarms} from './firestore';
import { Route, Routes } from "react-router-dom"
import GlobalNavBar from './Components/GlobalNavBar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3FAB94',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF0000',
    },
  },
});

function App() {
  // let farms = getFarms();
  return (
    <ThemeProvider theme={theme}>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Signup" element={<Signup/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App