import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {

  return (
    <Button variant='contained' component={Link} to='/profile/basics'>Begin-</Button>
  )
}

export default Welcome