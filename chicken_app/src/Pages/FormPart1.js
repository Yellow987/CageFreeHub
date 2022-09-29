import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const FormPart1 = ({sendDataToPage})=>{
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
        <Container>
             <Grid container spacing={2} alignItems='center' style={styles.toNavMenuMargin}>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }} fontWeight='bold' style={{marginBottom:'16px'}}>
                    Company basics
                    </Typography>
                    <Typography variant="h6" component='p' style={{marginBottom:'48px'}} >We’ll need some information about your company, and your farm, to create a profile to present to interested buyers</Typography>
                   
                </Grid>
                <Grid container xs={12} sm={4}  justifyContent="flex-start" direction='column' >
                <TextField id="outlined-basic" label="Company Name" variant="outlined" />
                <TextField id="outlined-basic" label="Website" variant="outlined" />
                <Button variant="contained" style={{alignSelf:'flex-end'}} onClick={() => {
                            sendDataToPage('formpart2');
                            }}>Next</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FormPart1