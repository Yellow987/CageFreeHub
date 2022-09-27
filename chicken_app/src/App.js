import React, {useState, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import  {getFarms} from './firestore';
import { Landingpage } from './Landingpage';
import { FormPart1 } from './FormPart1';
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
  let farms = getFarms();
  const [page, setPage] = useState('landingpage');
  const sendDataToPage = (newPage)=>{
    setPage(newPage);
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cage Free Hub
          </Typography>
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
      {
        page==='landingpage' && <Landingpage sendDataToPage={sendDataToPage} />
      }
      { page==='formpart1' && <FormPart1 sendDataToPage={sendDataToPage} />}
      
    </ThemeProvider>
  );
}

export default App