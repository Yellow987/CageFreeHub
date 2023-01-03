import { useState } from 'react'
import { Typography, Button, Popover, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function ClaimedPopup(props) {
  const { isClaimed } = props.props
  const [claimedAnchorEl, setClaimedAnchorEl] = useState(null);

  return (
    <Box>
      <Button  
        sx={{ 
          backgroundColor: isClaimed ? "primary.light" : "greyOut.main", 
          color:"primary.main", 
          marginLeft:'16px', 
          paddingLeft:'8px', 
          paddingRight:'8px', 
          display:"flex", 
          flexDirection:"row", 
          alignItems:'center',
          height:'24px'
        }}
        onClick={(e) => setClaimedAnchorEl(e.currentTarget)}
      >
        <Typography sx={{ color: isClaimed ? "primary.main" : "greyOut.contrastText" }} variant=''>{isClaimed ? "Claimed" : "Unclaimed"}</Typography>
        <HelpOutlineIcon style={{ marginLeft:'4px' }} sx={{ color: isClaimed ? "primary.main" : "greyOut.contrastText" }} fontSize="1" />
      </Button>
      <Popover
        open={Boolean(claimedAnchorEl)}
        anchorEl={claimedAnchorEl}
        onClose={() => setClaimedAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, backgroundColor:"#1B2B3E", color:"#FFFFFF", width:'320px' }}>
          {isClaimed ? 
            `"Claimed" means that the owner of this farm has either filled out or authenticated all the information shown, and keeps it up to date` 
            : `"Unclaimed" means that the owner of this farm has not filled out or authenticated the information shown, and may not be up to date`
          }
        </Typography>
      </Popover>
    </Box>
  )
}

export default ClaimedPopup