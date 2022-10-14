import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'

function Imagery() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Imagery')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveData() {
        
  }

  useEffect(() => {
    if (goToPage === '') {return}
    saveData()  
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/production-details')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  return (
    <div>Imagery</div>
  )
}

export default Imagery