import React from 'react'
import Post from "../Post";
import {Link, Navigate,useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { UserContext } from '../UserContext';
import NotFoundPage from './NotFoundPage';

const UserProfile = () => {
  //const {setUserInfo,userInfo} = useContext(UserContext);
  const [userPosts, setuserPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [found,setfound] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  const username = param.username;
  //console.log("userInfo: " , userInfo);

  useEffect(()=>{
    try{
      fetch(`http://localhost:3000/${username}`)
        .then(response => {
          response.json().then(result => {
            console.log("result on FE", result);
            setuserPosts(result);
            setLoading(false);
            if(result.status === 404){
              setfound(false);
            }
          })
      })
    }
    catch(err){
      throw err;
      //console.log("error on FE:" ,err);
    }
    
  },[])

  if(loading) return <div>Loading...</div>

  return (
    <>
      {userPosts.length == 0 && ( <div>You haven't posted anything yet !</div>)}

      {userPosts.length > 0 && userPosts.map(post => (
        <Post {...post} />
      ))}

      {!found && (<NotFoundPage/>)}
    </>
  )
}
export default UserProfile