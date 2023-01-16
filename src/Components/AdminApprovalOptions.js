import { useState } from 'react'
import { Box, Button, Paper, TextField } from '@mui/material';
import { isAdmin } from '../AdminAccountsConfig'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteBuyerAccount, updateBuyer, updateFarm, updateUserInfo } from './../firestore';
import { sendEmailAboutApprovalOrRejection } from './../firestore';

function AdminApprovalOptions(props) {
  const { data, id, isSeller } = props.props
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  const [rejectMessageBoxOpen, setRejectMessageBoxOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const websiteUrl = {dev:"http://localhost:3000/", preprod:'https://freerangeeggfarm-26736.web.app/', prod:'TODO'}
  const URL = websiteUrl[process.env.REACT_APP_STAGE] + "seller-signup/claim-profile/" + id
  const utcDate = new Date()

  function handleApprove(e) {
    e.preventDefault()
    if (!window.confirm('Are you sure you want to **APPROVE** this profile?')) { return }
    sendEmail(true).then((emailSent) => {
      if (!emailSent) return
      if (isSeller) {
        updateFarm(id, { adminLastStatusUpdate: utcDate, status:'approved' }).then(() => {
          window.location.reload();
        }) 
      } else {
        updateUserInfo(id, {isApprovedToViewSellers: true}).then(() => {
          updateBuyer(id, { adminLastStatusUpdate: utcDate, status:'approved' }).then(() => {
            window.location.reload();
          })
        })
      }
    })
  }

  function handleReject(e) {
    e.preventDefault()
    sendEmail(false, rejectionReason).then((emailSent) => {
      if (!emailSent) return
      setRejectMessageBoxOpen(false)
      if (isSeller) {
        updateFarm(id, { adminLastStatusUpdate: utcDate, status:'rejected' }).then(() => {
          window.location.reload();
        })
      } else {
        deleteBuyerAccount(id).then(() => {
          window.location.reload();
        })
      }
    })
  }

  function handleEdit(e) {
    console.log(id)
    e.preventDefault()
    localStorage.setItem('uidToEdit', JSON.stringify(id))
    navigate('/profile/basics')
  }

  async function sendEmail(isApproved, emailRejectionReason = "") {
    if (isSeller && !data.claimed) { 
      alert("failed to send email due to unclaimed profile")
      return false
    }
    const emailData = {
      isSeller: isSeller, //needed for all
      isApproved: isApproved, //needed for all
      emailToUid: id,
      name: data.name, //needed for all
      rejectionReason: emailRejectionReason, //needed when denied
      userUid: id //needed for approved sellers, and deleted buyers
    }
    await sendEmailAboutApprovalOrRejection(emailData)
    return true
  }

  return (
    <>
      {isAdmin(currentUser.uid) && <Box sx={{ marginBottom:4 }}>
        <Button variant='contained' onClick={(e) => handleApprove(e)}>Approve Profile</Button>
        <Button color='megaDanger' sx={{ marginLeft:5 }} onClick={(e) => setRejectMessageBoxOpen(true)} variant='contained'>Reject Profile</Button>
        {isSeller && <Button variant='outlined' sx={{ marginLeft:5 }} onClick={(e) => handleEdit(e)} >Edit Profile</Button>}
        {!data.claimed && isSeller && 
          <Box marginTop={2}>
            This profile is unclaimed. Send this link to someone to claim it:&nbsp;
            <a href={URL} >{URL}</a>
          </Box>
        }
        {rejectMessageBoxOpen && <Box>
          <Paper sx={{ margin:2, display:'flex', flexDirection:'column', padding: 1 }}>
            Reason for rejection:
            <TextField value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)}></TextField>
            <Box sx={{ margin:2 }}>
              {!isSeller && <Box>
                We were unable to register your organization on the Cage-Free Hub, a database and resource centre that connects buyers and sellers of 
                cage-free eggs from around the world. {rejectionReason} 
                <br /><br />We’d still love to have you back! If this problem can be remedied, please sign up again through our organization sign up page.
              </Box>}
              {isSeller && <Box>
                We were unable to register your business’s profile on the Cage-Free Hub, a database and resource centre that 
                connects buyers and sellers of cage-free eggs from around the world, because the information you provided was incomplete. {rejectionReason}
                <br /><br />Finalize your profile today so you can start making connections, improving your market visibility, and sharing 
                resources and learning with others like you. To reaccess your profile submission, access the button below titled “Finalize profile”.
              </Box>}  
            </Box>
          </Paper>
          <Box sx={{ display:"flex", justifyContent:"space-between" }}>
            <Button variant='contained' onClick={() => setRejectMessageBoxOpen(false)}>Cancel</Button>
            <Button color='megaDanger'  onClick={(e) => handleReject(e)} variant='contained'>Confirm Profile Rejection</Button>
          </Box>
        </Box>}
      </Box>}
    </>
  )
}

export default AdminApprovalOptions