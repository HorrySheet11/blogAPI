import Home from './pages/Home.jsx';
import InspectPost from './pages/InspectPost.jsx';
import SignUp from './pages/SignUp.jsx';
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/post/:id" element={<InspectPost />} />
    </Routes>
  )
}

export default App
