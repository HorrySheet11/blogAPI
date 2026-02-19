import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/add" element={<AddPost />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
    </Routes>
  )
}

export default App
