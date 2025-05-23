import LoginPage from "./components/LoginPage.tsx"
import HomePage from './components/HomePage.tsx'
import ProfilePage from './components/ProfilePage.tsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/Navbar.tsx"

function App() {
  return <div className="size-full">
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
    </Routes>
  </div>
}

export default App