import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import chickenImage from './../Images/chickenImage.jpg';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom"

const Home = ()=> {
    const styles = {
        twoButtons: {
            display: 'flex',
            flexDirection: { xs:'column', sm: 'row' },
            height: '48px',
        },
        marginButton : {
            marginRight: { sm:2, xs:0 },
        },
        toNavMenuMargin : {
            marginTop: { sm:'143px', xs:'40px' }
        }
        
    };
    return(
        <Container maxWidth="lg" sx={styles.toNavMenuMargin}>
            <Grid container spacing={2} alignItems='center' direction={{sm:"row", xs:"column"}}>
                <Grid item xs={12} sm={6}>
                    <Box maxWidth="440px" >
                        <Typography variant="title" sx={{marginBottom:'24px'}} >
                            Asia’s trusted directory of cage-free egg sellers
                        </Typography>
                        <Typography variant="p_large" style={{marginBottom:'10px'}} >
                            <Box fontWeight='Bold' display="inline">Do you sell cage-free eggs?</Box> Sign up to create a profile of your company, and get discovered by purchasers
                        </Typography>
                        <Typography variant="p_large" style={{marginBottom:'48px'}} >
                            <Box fontWeight='Bold' display="inline">Are you looking to buy cage-free eggs?</Box> Sign up to view a list of cage-free egg sellers near you
                        </Typography>
                        <Box sx={styles.twoButtons}>
                            <Button component={Link} to="/Signup" 
                                variant="contained" sx={styles.marginButton}> 
                                Sign up as a seller
                            </Button>
                            <Button variant="outlined" sx={{ boxShadow: 3, mt: {xs: 1, sm: 0} }} mt="200px">
                                Sign up as a buyer
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={6} sx={{ alignItems: 'center'}} justifyContent="flex-end" >
                    <Box component="img" src={chickenImage} alt="chickenImage" maxWidth="399px" sx={{ width:1 }} display={{ sm:'block',xs:'none' }}/>
                </Grid>
            </Grid>
            <Box 
                marginTop={{ sm:"80px", xs:"60px" }} 
                marginBottom='157px' 
                style={{display:'flex', justifyContent:'center', alignContent:'center', gap:'10px' }}>
                <Typography variant="p_default" color='primary.main' style={{backgroundColor:' #EFFAF9', padding:'8px', paddingTop:'0px', paddingBottom:'0px'}}>Always free</Typography>
                <Typography variant="p_default">A project by Global Food Partners</Typography>
            </Box>
      </Container>
    )
}

export default Home