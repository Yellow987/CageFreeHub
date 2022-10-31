import { React, useState, useRef } from "react";
import Alert from "@mui/material/Alert";
import { Box, FormControl, createTheme, MenuItem, InputLabel, Typography, Select, TextField, Checkbox, FormControlLabel } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useTranslation} from "react-i18next";
import { Button } from "@mui/material";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';

let CEO = "CEO";
let companyOwner = "CompanyOwner";
let productManager = "ProductManager";
let placeholder = "Select Role";


function BuyerSignup() {

  const { t } = useTranslation(['signup']);
  const [loading, setLoading] = useState(false)
  const fullName = useRef("");
  const orginizationName = useRef("")
  const orginizationRole = useRef("")
  const workEmail = useRef(null)
  const buttonRef = useRef(false)

  const format = {
    width: "397px",
    height: "48px",
    radius: "3px",
    marginTop: "8px",
  } 

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setLoading(false)
  }

  const db = getFirestore();
  const { currentUser } = useAuth();
  async function sendData(){
      let data = {
        email: workEmail,
        name: fullName,
        orginization: orginizationName,
        role: orginizationRole
          }
      await setDoc(doc(db, "buyers", currentUser.uid), data);
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" flexDirection='column' justifyContent="flex-start" alignItems="flex-start" sx={{marginTop: "48px", color: "primary.blue", height: "42px", width: "400px"}}>
          <Typography sx={{left: "0", marginTop: "10px"}} variant="h1_32" >Basic info</Typography>
        </Box>
        <Box>
          <Alert severity="info" sx={{marginTop: "32px", backgroundColor: "#EFFAF9", color: "alert.primary", "& .MuiAlert-icon": {width: "12px", color: "#3FAB94", height: "12px", top: "2px", left: "2px", marginTop: "15px"}}}>
            <Typography variant='p_default' display="flex" sx={{alignItems: "center", maxHeight: "50px", maxWidth: "340px", color: "#3FAB94", marginTop: "0px", left: "32px", marginLeft: "10px"}}>
              Please provide us this basic information about you and your organization so that we can assure seller information remains private and respected.
            </Typography>
          </Alert>
        </Box>
        <Box>
          <form>
            <Box display="flex" flexDirection='column' justifyContent="flex-start" alignItems="flex-start" sx={{marginTop: "25px"}}>
              <Typography variant="p_default" sx={{color:"primary.blue", height: "21px", top: "185px", width: "75px", fontWeight: "bold"}}>Full name</Typography>
              <TextField label={"E.g. John Doe"} InputLabelProps={{style: { color: "#AFB7C2" } }} InputProps={{ sx: { weight: 397, height: 48 } }} sx={{ ...format}} inputRef={fullName}/>
              <Box sx={{marginTop: "32px"}}></Box>
              <Typography variant="p_default" sx={{color:"primary.blue", height: "21px", top: "185px", width: "75px", fontWeight: "bold"}}>Organization</Typography>
              <TextField label={"E.g. Marriot"} InputLabelProps={{style: { color: "#AFB7C2" } }} InputProps={{ sx: { weight: 397, height: 48 } }} sx={{ ...format}} inputRef={orginizationName}/>
              <Box sx={{marginTop: "32px"}}></Box>
              <Typography variant="p_default" sx={{color:"primary.blue", height: "21px", top: "185px", width: "150px", fontWeight: "bold"}}>Role at organization</Typography>
                <FormControl fullWidth sx={{marginTop: "8px"}}>
                  <Select sx={{'& .MuiSelect-select .notranslate::after': placeholder ? {content: `"${placeholder}"`, opacity: 0.42,} : {}, width: "397px", height: "48px"}} id="select" value={orginizationRole}>
                    <MenuItem string={CEO}>CEO</MenuItem>
                    <MenuItem string={companyOwner}>Company Owner</MenuItem>
                    <MenuItem string={productManager}>Product Manager</MenuItem>
                  </Select>
                </FormControl>
              <Box sx={{marginTop: "32px"}}></Box>
              <Typography variant="p_default" sx={{color:"primary.blue", height: "21px", top: "185px", width: "85px", fontWeight: "bold"}}>Work email</Typography>
              <TextField label={"E.g. johndoe@marriot.com"} InputLabelProps={{style: { color: "#AFB7C2" } }} InputProps={{ sx: { weight: 397, height: 48 } }} sx={{ ...format}} inputRef={workEmail}/>
            </Box>
          </form>
              <Box sx={{marginTop: "32px"}}></Box>
          <Button type="submit" disabled={loading} fullWidth variant='contained' sx={{ ...format, fontWeight: "bold", marginTop: "8px", radius: "3px" }} ref={buttonRef}>
            Submit <ArrowRightAltIcon fontSize="inherit" style={{ fontSize: "20px" }}/>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default BuyerSignup;