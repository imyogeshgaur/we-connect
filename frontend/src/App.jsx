import "./App.css"
import { Routes, Route } from "react-router-dom"
import Auth from "./Components/auth/Auth"
import Profile from "./Components/common/Profile"
import AddPost from "./Components/common/AddPost"
import Post from "./Components/common/Post"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </>
  )
}

export default App