import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default App
