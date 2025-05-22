import LoginPage from "./components/LoginPage.tsx"
import HomePage from './components/HomePage.tsx'
import Profile from './components/ProfilePage.tsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/Navbar.tsx"

function App() {
  return <div className="size-full">
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Profile />} />
    </Routes>
  </div>
}

export default App
