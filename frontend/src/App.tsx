import LoginPage from "./components/LoginPage.tsx"
import HomePage from './components/HomePage.tsx'
import ProfilePage from './components/ProfilePage.tsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/Navbar.tsx"

function App() {
  return <div className="size-full">

    <Routes>
      <Route path="/" element={ <> <Navbar/> <HomePage/> </> } />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile/:username" element={<> <Navbar/> <ProfilePage/> </> } />
    </Routes>
  </div>
}

export default App