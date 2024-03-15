import {Link, Navigate,useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://weblogs-3hui.onrender.com/profile', {
      headers: {
        "token" : localStorage.getItem('token')
      },
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function logout() {
    await fetch('https://weblogs-3hui.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    localStorage.removeItem('token');
    navigate('/login');
  }

  const username = userInfo?.username;
  //console.log("username after logout",username);
  

  return (
    <header>
      <Link className="flex gap-1 justify-center items-center" to={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
        <Link to="/" className="logo">WebLogs</Link>
      </Link>
      
      <nav>
        {username && (
          <>
            <Link className="hover:underline" to="/create">Create new post</Link>
            <Link className="hover:underline" onClick={logout} >Logout ({username})</Link>
            <Link to={`/${username}`} className='h-[2rem] w-[2rem] bg-[#003663] text-white  flex justify-center items-center rounded-full font-extrabold cursor-pointer' >{username.charAt(0).toUpperCase()}</Link> 
          </>
        )}
        {!username && (
          <>
            <Link className="hover:underline" to="/login">Login</Link>
            <Link className="hover:underline" to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}