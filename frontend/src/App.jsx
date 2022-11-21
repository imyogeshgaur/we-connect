import "./App.css"
import { Routes, Route } from "react-router-dom"
import Auth from "./Components/auth/Auth"
import Profile from "./Components/common/Profile"
import AddPost from "./Components/common/AddPost"
import Post from "./Components/common/Post"
import ViewProfile from "./Components/common/ViewProfile"
import ForgetPassword from "./Components/auth/ForgetPassword"
import ResetPassword from "./Components/auth/ResetPassword"
import NotFoundPage from "./Components/common/NotFoundPage"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth  />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/addPost" element={<AddPost  />} />
        <Route path="/post/:id" element={<Post  />} />
        <Route path="/viewDetail/:id" element={<ViewProfile  />} />
        <Route path="/forgetPass" element={<ForgetPassword  />} />
        <Route path="/resetPass/:email" element={<ResetPassword  />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App