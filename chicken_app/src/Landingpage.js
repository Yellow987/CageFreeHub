import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import chickenImage from './Images/chickenImage.jpg';
import Container from '@mui/material/Container';
export function Landingpage(){
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
            marginTop:'143px'
        }
        
    };
    return(
        <Container maxWidth="lg" style={styles.toNavMenuMargin}>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }} fontWeight='bold' style={{marginBottom:'16px'}}>
                    Asia’s trusted directory of cage-free egg sellers
                    </Typography>
                    <Typography variant="h6" component='p' style={{marginBottom:'48px'}} >Browse the profiles of cage-free sellers, or create a profile yourself and get discovered!</Typography>
                    <div style={styles.twoButtons}>
                        <Button variant="contained" style={styles.marginButton}>Sign up as a seller</Button>
                        <Paper elevation={3}><Button variant="outlined" style={styles.height}>Sign up as a buyer</Button></Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} sx={{display: 'flex', alignItems: 'center'}} justifyContent="flex-end" >
                    <img src={chickenImage} alt="chickenImage" style={styles.imageDimensions} />
                </Grid>
            </Grid>
      </Container>
    )
}