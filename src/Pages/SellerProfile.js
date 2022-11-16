import React from "react";
import { Typography, Box, Divider, Link } from '@mui/material';

function SellerProfile(){


    return(
        <Box sx={{display:'flex', margin:'0 auto', justifyContent:'space-between', maxWidth:'1060px'}}>
            <Box width='620px'>
                <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'54px'}}>
                    <Typography variant="h1_32" >Happy Hens</Typography>
                    <img src='https://via.placeholder.com/48' />
                </Box>
                <Box>
                    <Typography variant="label" sx={{marginBottom:'16px'}}>Distribution country (countries)</Typography>
                    <Typography variant='p_large' sx={{marginTop:'16px'}}>Thailand</Typography>
                    <Typography variant='p_large'>Malaysia</Typography>
                    <Typography variant='p_large' sx={{marginBottom:'48px'}}>Indonesia</Typography>

                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Farm location(s)</Typography>
                    <Typography variant='p_large' sx={{marginTop:'16px'}}>Bangcok, Thailand</Typography>
                    <Typography variant='p_large'>Phuket, Thailand</Typography>
                    <Typography variant='p_large'>Lorem, Thailand</Typography>
                    <Typography variant='p_large' sx={{marginBottom:'48px'}}>Ipsum, Thailand</Typography>
                </Box>
                <Divider light />
                <Box>
                    <Box>
                        <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Cage-free egg type</Typography>
                        <Typography variant='p_large'sx={{marginTop:'16px'}}>Shell</Typography>
                        <Typography variant='p_large' sx={{marginBottom:'48px'}}>Liquid</Typography>
                    </Box>
                    <Box>
                        <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Production capacity (year) / Price</Typography>
                        <Typography variant='p_large' sx={{marginTop:'16px'}}>10,000 eggs / $.20 USD per egg</Typography>
                        <Typography variant='p_large' sx={{marginBottom:'48px'}}>3 tons / $1,000 USD per ton</Typography>

                    </Box>
                </Box>
                <Divider light />
                <Box>
                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Website</Typography>
                    <Link href='http://happyhens.com'sx={{display:'block'}}>http://happyhens.com</Link>
                    <Divider light sx={{marginBottom:'48px'}} />
                
                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Production system of farm(s)</Typography>
                    <Typography variant='p_large' sx={{marginTop:'16px'}}>Aviary: multi-level cage-free system</Typography>
                    <Typography variant='p_large' sx={{marginBottom:'48px'}}>Barn: single level cage-free system</Typography>

                    <Typography variant="label" sx={{marginBottom:'16px', marginTop:'48px'}}>Certification</Typography>
                    <Typography variant='p_large' sx={{marginTop:'16px', marginBottom:'48px' }}>Humane Society</Typography>
                    
                    <img src='https://via.placeholder.com/620x412' />
                    
                </Box>

            </Box>
            <Box width='290px'>
                <Typography variant="label" sx={{marginBottom:'16px'}}>Contact Happy Hens</Typography>
                <Typography variant="p_large" sx={{marginBottom:'16px'}}>Message Shing through WeChat</Typography>
                <Link href='tel:+2 298 2889 997' sx={{display:'block'}}>+2 298 2889 997</Link>
            
                <Typography variant="p_large" sx={{marginBottom:'16px'}}>Message Shing through phone</Typography>
                <Link href='tel:+2 298 2889 997' sx={{display:'block'}}>+2 298 2889 997</Link>
            </Box>

        </Box>
    )
}

export default SellerProfile;