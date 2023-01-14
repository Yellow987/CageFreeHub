import { useAuth } from '../AuthContext'
import adminUid from '../AdminAccountsConfig';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, props = {} }) {
  const { currentUser, currentUserInfo } = useAuth();
  const location = useLocation()
  const { onPublicPage = false, allowSellers = false, allowBuyers = false, allowUid = '', redirect = true, needVerifiedEmail = false } = props

  function navigate(route) {
    if (route === location.pathname) { console.log('correct page'); return children }
    console.log(route)
    if (redirect) {
      return <Navigate to={route} replace />
    }
  }

  if(!currentUser && !onPublicPage){ //deny non-logged in users to private pages
    console.log("deny non-logged in users to private pages")
    return navigate('/login')
  }
  
  if(!currentUser && onPublicPage){ //allow nonlogged in users to public pages
    console.log("allow nonlogged in users to public pages")
    return children
  }
  
  if (currentUserInfo && currentUser) {

    if (currentUser.uid === adminUid) { //always allow admin
      console.log('always allow admin')
      return children
    }

    if (!currentUserInfo.isProfileComplete && !((currentUserInfo.isSeller && (location.pathname === '/profile/welcome' || location.pathname === '/profile/basics' || location.pathname === '/profile/locations' || location.pathname === '/profile/contact' || 
    location.pathname === '/profile/product-details' || location.pathname === '/profile/production-details' || location.pathname === '/profile/imagery' )) ||
    (currentUserInfo.isSeller && location.pathname === '/buyer-setup') )) { //profile must be complete
      console.log('profile must be complete for ' + (currentUserInfo.isSeller ? 'seller' : 'buyer'))
      return navigate((currentUserInfo.isSeller ? '/profile/welcome' : '/buyer-setup'))
    }

    if (!currentUserInfo.isSeller && (needVerifiedEmail && !currentUser.emailVerified) ) { //buyers must verify their email
      console.log('buyers must verify their email')
      return navigate('/confirm-email')
    }

    if (!currentUserInfo.isSeller && location.pathname === "/confirm-email" && currentUser.emailVerified) { //verified buyers cannot be on verify email page
      console.log('buyers must verify their email')
      return navigate('/sellers')
    }

    if (allowUid === currentUser.uid) { //allow user with completed profile to page(usually buyer for their own page)
      console.log('allow user with completed profile to page(usually buyer for their own page)')
      return children
    }

    if (onPublicPage && currentUser) { //deny logged in users to home page, redirect to proper page
      console.log('deny logged in users to home page, redirect to proper page')
      return navigate(currentUserInfo.isSeller ? '/profile/' + currentUser.uid : '/sellers')
    }

    if (!allowSellers && currentUserInfo.isSeller) { //deny sellers to non-seller pages
      console.log('deny sellers to non-seller pages')
      return (<>no permission</>)
    }

    if (!allowBuyers && !currentUserInfo.isSeller) { //deny buyers to non-buyer pages
      console.log('deny buyers to non-buyer pages')
      return (<>no permission</>)
    }
  }
  return children
}