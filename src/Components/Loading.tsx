import React from 'react'
import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
      }}>
        <CircularProgress style={{ margin: '16px' }} />
      </div>
  )
}

export default Loading