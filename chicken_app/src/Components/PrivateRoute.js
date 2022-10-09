import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (

    <Route>
        {...rest}
        render={props => {
          currentUser ? <Component {... props} /> : useNavigate("/Login")
        }}
    </Route>
  )
}
