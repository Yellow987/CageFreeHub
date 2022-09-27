import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import chickenImage from './Images/chickenImage.jpg';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const Landingpage = ({sendDataToPage})=> {
    const styles = {
        twoButtons: {
            display: 'flex',
            height: '48px'
        },
        marginButton : {
            marginRight: '16px'
        },
        height : {
            height : '48px'
        },
        imageDimensions : {
            height: '399px',
            width: '399px',
            borderRadius : '8px'
        },
        toNavMenuMargin : {
            marginTop: { sm:'143px', xs:'40px' }
        }
        
    };
    return(
        <Container maxWidth="lg" sx={styles.toNavMenuMargin}>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }} fontWeight='bold' style={{marginBottom:'16px'}}>
                    Asia’s trusted directory of cage-free egg sellers
                    </Typography>
                    <Typography variant="h6" component='p' style={{marginBottom:'48px'}} >Browse the profiles of cage-free sellers, or create a profile yourself and get discovered!</Typography>
                    <Box style={styles.twoButtons}>
                        <Button variant="contained" style={styles.marginButton} onClick={() => {
                            sendDataToPage('formpart1');
                            }}>Sign up as a seller</Button>
                        <Paper elevation={3}><Button variant="outlined" style={styles.height}>Sign up as a buyer</Button></Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ alignItems: 'center'}} justifyContent="flex-end" >
                    <Box component="img" src={chickenImage} alt="chickenImage" sx={{ width:1 }}/>
                </Grid>
            </Grid>
            <Typography variant="h6" component='p' >Always free</Typography>
      </Container>
    )
}