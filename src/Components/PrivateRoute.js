import { useAuth } from '../AuthContext'
import adminUid from '../AdminAccountsConfig';
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { currentUser, currentUserInfo } = useAuth();
  const navigate = useNavigate()
  const editProfileLink = currentUserInfo.isSeller ? '/profile/welcome' : '/buyer-setup'

  if(!currentUser){
    navigate('/login')
    return
  }
  
  if (currentUser.uid === adminUid) {
    return children
  }

  // if (!currentUser.profileComplete) {
  //   navigate(editProfileLink)
  // }

  // if (!currentUserInfo.isSeller && !currentUser.isEmailVerified) {
  //   navigate('/confirm-email')
  // }

  // if (currentUserInfo.isSeller) {
  //   return (<>no permission</>)
  // }

  return children

}