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

        </Route>

      </Routes>
      </UserContextProvider>
     
    </BrowserRouter>

  )
}

export default App
