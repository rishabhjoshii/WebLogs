import "./App.css";
import Header from "./Header";
import Layout from "./Layout";
import Post from "./Post"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import { UserContextProvider } from "./UserContext";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfile from "./pages/UserProfile";

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
        <Route path="/" element={<Layout/>}>
        
          <Route index element={<IndexPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/create" element={<CreatePost/>}></Route>
          <Route path="/post/:id" element={<PostPage/>}></Route>
          <Route path="/edit/:id" element={<EditPost/>}></Route>
          <Route path="/:username" element={<UserProfile/>} ></Route>
          <Route path="/:username/post/:id" element={<PostPage/>}></Route>
          <Route path="/404"  element={<NotFoundPage/>}></Route>
          <Route path="*"  element={<NotFoundPage/>}></Route>


        </Route>

      </Routes>
      </UserContextProvider>
     
    </BrowserRouter>

  )
}

export default App
