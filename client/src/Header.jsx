import {Link, Navigate,useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function logout() {
    await fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    navigate('/');
  }

  const username = userInfo?.username;
  //console.log("username after logout",username);
  

  return (
    <header>
      <Link to="/" className="logo">WebLogs</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={logout} >Logout ({username})</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}