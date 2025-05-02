import LoginPage from "./components/LoginPage.tsx"
import HomePage from './components/HomePage'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return <div className="w-screen h-screen">
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </div>
}

export default App
