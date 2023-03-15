import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import chickenImage from './../Media/chickenImage.jpg';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import { useMediaQuery, createTheme } from '@mui/material';

const Home = ()=> {
    const { t } = useTranslation(['home']);
    const theme = createTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
    const styles = {
        twoButtons: {
            display: 'flex',
            flexDirection: { xs:'column', sm: 'row' },
            height: '48px',
        },
        marginButton : {
            marginRight: { sm:2, xs:0 },
            fontWeight:700
        },
        toNavMenuMargin : {
            marginTop: { sm:'143px', xs:'40px' }
        }
        
    };
    return (
      <Container maxWidth="lg" sx={styles.toNavMenuMargin}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          direction={{ sm: "row", xs: "column" }}
        >
          <Grid item xs={12} sm={6}>
            <Box maxWidth="440px">
              <Typography variant="h1_32" sx={{ marginBottom: "24px" }}>
                {t("title")}
              </Typography>
              <Typography variant="p_large" style={{ marginBottom: "10px" }}>
                <Trans
                  i18nKey="isSeller"
                  t={t}
                  components={[<Box fontWeight="Bold" display="inline" />]}
                />
              </Typography>
              <Typography variant="p_large" style={{ marginBottom: "48px" }}>
                <Trans
                  i18nKey="isBuyer"
                  t={t}
                  components={[<Box fontWeight="Bold" display="inline" />]}
                />
              </Typography>
              <Box sx={styles.twoButtons}>
                <Button
                  component={Link}
                  to="/seller-signup"
                  variant="contained"
                  sx={styles.marginButton}
                >
                  {t("sellerSignup")}
                </Button>
                <Button
                  component={Link}
                  to="/buyer-signup"
                  variant="outlined"
                  sx={{ boxShadow: 3, mt: { xs: 1, sm: 0 } }}
                  mt="200px"
                >
                  {t("buyerSignup")}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sm={6}
            sx={{ alignItems: "center" }}
            justifyContent="flex-end"
          >
            {!isSmallScreen && <Box
              component="img"
              src={chickenImage}
              alt="chickenImage"
              maxWidth="399px"
              sx={{ width: 1 }}
              display={{ sm: "block", xs: "none" }}
            />}
          </Grid>
        </Grid>
        <Box
          marginTop={{ sm: "80px", xs: "60px" }}
          marginBottom="157px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "10px",
          }}
        >
          <Typography
            variant="p_default"
            color="primary.main"
            style={{
              backgroundColor: " #EFFAF9",
              padding: "8px",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >
            {t("free")}
          </Typography>
          <Typography variant="p_default">{t("by")}</Typography>
        </Box>
      </Container>
    );
}

export default Home