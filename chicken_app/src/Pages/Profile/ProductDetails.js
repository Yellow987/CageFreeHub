import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useOutletContext } from 'react-router'

function ProductDetails() {
  const [setPage, goToPage, setGoToPage] = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    setPage('Product details')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveData() {
        
  }

  useEffect(() => {
    if (goToPage === '') {return}
    saveData()  
    if (goToPage === 'next') {
      setGoToPage('')
      navigate('/profile/production-details')
    } else if (goToPage === 'back') {
      setGoToPage('')
      navigate('/profile/contact')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToPage])

  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails