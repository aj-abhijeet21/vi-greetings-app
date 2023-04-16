import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegistrationWrapper from './pages/Registration/RegistrationWrapper'
import ProfileWrapper from './pages/Profile/ProfileWrapper'
import SplashWrapper from './pages/SplashScreen/SplashScreen'

function App() {
  return (
    <div className='App h-screen font-viFont font-light'>
      <Router>
        <Routes>
          <Route path='/' element={<SplashWrapper />} />
          <Route path='/registration' element={<RegistrationWrapper />} />
          <Route path='/splash' element={<SplashWrapper />} />
          <Route path='/profile' element={<ProfileWrapper />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
