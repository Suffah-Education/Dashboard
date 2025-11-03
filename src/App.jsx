import './App.css'
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Signup from './auth/Signup'
import Login from './auth/Login'

function App() {


  return (
   <BrowserRouter>
    <Routes>
       <Route path="/" element={<h1 className="text-center mt-20 text-2xl">Welcome to Suffah Dashboard</h1>} />
        
        {/* Signup and Login routes */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
