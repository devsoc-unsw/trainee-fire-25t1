import LoginPage from "./components/LoginPage.tsx"
import HomePage from './components/HomePage.tsx'
import Profile from './components/ProfilePage.tsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return <div className="w-screen h-screen">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
}

export default App
