import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import chickenImage from './../Images/chickenImage.jpg';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

const Home = ()=> {
    const { t, i18n } = useTranslation(['home']);

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
                            {t('title')}
                        </Typography>
                        <Typography variant="p_large" style={{marginBottom:'10px'}} >
                            <Box fontWeight='Bold' display="inline">{t('isSeller')}</Box>{t('sellerTask')}
                        </Typography>
                        <Typography variant="p_large" style={{marginBottom:'48px'}} >
                            <Box fontWeight='Bold' display="inline">{t('isBuyer')}</Box>{t('buyerTask')}
                        </Typography>
                        <Box sx={styles.twoButtons}>
                            <Button component={Link} to="/SellerSignup" 
                                variant="contained" sx={styles.marginButton}> 
                                {t('sellerSignup')}
                            </Button>
                            <Button component={Link} to="/BuyerSignup"  
                                variant="outlined" sx={{ boxShadow: 3, mt: {xs: 1, sm: 0} }} mt="200px">
                                {t('buyerSignup')}
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
                <Typography variant="p_default" color='primary.main' style={{backgroundColor:' #EFFAF9', padding:'8px', paddingTop:'0px', paddingBottom:'0px'}}>{t('free')}</Typography>
                <Typography variant="p_default">{t('by')}</Typography>
            </Box>
      </Container>
    )
}

export default Home