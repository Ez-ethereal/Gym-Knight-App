import Login from "/src/Components/LoginPage/Login.jsx"
import SignUp from "/src/Components/LoginPage/SignUp.jsx"
import ProfilePage from "/src/Components/ProfilePage/ProfilePage.jsx"

import { useState } from 'react'
import ExerciseScreen from "/src/Components/WorkoutSession/ExerciseScreen.jsx"
import RestScreen from "/src/Components/WorkoutSession/RestScreen.jsx"
import "./index.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [error, setError] = useState(null)

  async function handleLogin(email, password) {
    if (!email || !password) {
      props.setError('Please enter a username and password.')
      console.log(error)
      return
    }
    
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email: email, password: password})
      })
      const data = await response.json()
      if (response.ok) {
        alert('Login successful!')
        setIsLoggedIn(true)
        setAccessToken(data.accessToken)
      } else {
        setError(data.error)
      }
    } catch (error) {
      console.error("Error during login:", error.message)
      setError("An error occurred. Please try again.")
    }
  }

  function logout() {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/ProfilePage" /> : <Login onLogin={handleLogin} error={error} setError={setError}/>} />
        <Route path="/SignUp" element={isLoggedIn ? <Navigate to="/ProfilePage" /> : <SignUp />} />
        <Route path="/ProfilePage" element={isLoggedIn ? <ProfilePage logout={logout}/> : <Navigate to="/" />} />
        <Route path="/ExerciseScreen" element={isLoggedIn ? <ExerciseScreen /> : <Navigate to="/" />} />
        <Route path="/RestScreen" element={isLoggedIn ? <RestScreen /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
