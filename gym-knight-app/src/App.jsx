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

  function handleLogin() {
    setIsLoggedIn(true)
  }

  function logout() {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/ProfilePage" /> : <Login onLogin={handleLogin} />} />
        <Route path="/SignUp" element={isLoggedIn ? <Navigate to="/ProfilePage" /> : <SignUp />} />
        <Route path="/ProfilePage" element={isLoggedIn ? <ProfilePage logout={logout}/> : <Navigate to="/" />} />
        <Route path="/ExerciseScreen" element={isLoggedIn ? <ExerciseScreen /> : <Navigate to="/" />} />
        <Route path="/RestScreen" element={isLoggedIn ? <RestScreen /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
