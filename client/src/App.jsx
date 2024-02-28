import "./App.css";
import Header from "./Header";
import Layout from "./Layout";
import Post from "./Post"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        
          <Route index element={<IndexPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>

        </Route>

        

      </Routes>
    </BrowserRouter>

    // <main>
    //   <Header/>

    //   <Post/>
    //   <Post/>
    //   <Post/>


    // </main>
  )
}

export default App
