import React from 'react'
import { Typography } from '@mui/material'
import './Font32Text.css'

function Font32Text(props) {
  return (
    <Typography className="text-32">
        {props.text}
    </Typography>
  )
}

export default Font32Text