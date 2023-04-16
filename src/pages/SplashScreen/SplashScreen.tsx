import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/registration')
    }, 3000)
  }, [])

  return (
    <div className='flex justify-center items-center text-center h-full animate-pulse'>
      <img
        src={require('../../assets/images/logo.svg').default}
        className='w-1/4 h-1/4'
        alt='logo'
      />
    </div>
  )
}

export default SplashScreen
