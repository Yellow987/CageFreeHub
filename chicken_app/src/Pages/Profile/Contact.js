import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'

function Contact() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Contact')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
      if (goToPage === 'next') {
        setGoToPage('')
        navigate('/profile/contacts')
      } else if (goToPage === 'back') {
        setGoToPage('')
        navigate('/profile/locations')
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  return (
    <div>Contact</div>
  )
}

export default Contact