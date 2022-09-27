import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import chickenImage from './Images/chickenImage.jpg';
import Box from '@mui/material/Box';
import  {getFarms} from './firestore';
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

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Asia’s trusted directory of cage-free egg sellers
          </Typography>
          <Button variant="contained">Create Acct</Button>
        </Grid>
        <Grid item xs={12} sm={6} sx={{display: 'flex', alignItems: 'center'}} >
          <img src={chickenImage} alt="chickenImage"/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App