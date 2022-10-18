import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'

function Locations() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Location(s)')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveData() {
        
  }

  useEffect(() => {
    if (goToPage === '') {return}
    saveData()  
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile/contact')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/basics')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  return (
    <div>Locations</div>
  )
}

export default Locations