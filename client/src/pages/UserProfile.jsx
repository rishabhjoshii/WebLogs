import React from 'react'
import Post from "../Post";
import {Link, Navigate,useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { UserContext } from '../UserContext';
import NotFoundPage from './NotFoundPage';
import { Audio,ColorRing } from 'react-loader-spinner'

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
      fetch(`https://weblogs-3hui.onrender.com/${username}`)
        .then(response => {
          response.json().then(result => {
            //console.log("result on FE", result);
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

  if(loading) {
    return <div className='w-[100%] h-[80vh] flex justify-center items-center'>
    <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#000','#000','#000','#000','#000']} ></ColorRing>
  </div>
  }

  return (
    <>
      {!found && (<NotFoundPage/>)}
      <div class="border rounded-lg p-4 flex items-center space-x-2 text-sm w-full mx-auto mb-[40px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="font-semibold text-base">{username}</span>
    </div>

    <h1 className="text-3xl font-bold mb-[40px] underline decoration-2 text-center">Posts Created </h1>
    
      {userPosts.length == 0 && ( 
        <div class="flex flex-col justify-center items-center space-y-2  bg-gray-100 dark:bg-gray-900 h-[15rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-8 w-8"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" x2="8" y1="13" y2="13"></line>
              <line x1="16" x2="8" y1="17" y2="17"></line>
              <line x1="10" x2="8" y1="9" y2="9"></line>
            </svg>
            <h2 class="text-lg font-medium tracking-tighter">Haven't posted anything yet</h2>
            <p class="text-sm text-center text-gray-500 dark:text-gray-400">Start sharing your thoughts with the world.</p>
      </div>
      )}

      {userPosts.length > 0 && userPosts.map(post => (
        <Post {...post} />
      ))}

      
    </>
  )
}
export default UserProfile