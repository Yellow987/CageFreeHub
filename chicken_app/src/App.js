import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { green, purple } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500]
      }
    }
  })
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
