import React, { useState,useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Editor from '../Editor';


const CreatePost = () => {
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [files,setFiles] = useState("");
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo,userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    //console.log("userInfo is here:" , userInfo);

    async function createNewPost(e){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]); 
        data.set('username', userInfo.username);
        e.preventDefault();

        // const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // if (!token) {
        //     alert("Token not found");
        //     return;
        // }
        // else{
        //     console.log("token is here", token);
        // }
        //fetch call
        const response = await fetch('https://weblogs-3hui.onrender.com/post', {
            method: 'POST',
            body: data,
            headers: {
                "token" : localStorage.getItem('token'),
            },
            credentials: 'include',
        });
        if(response.ok){
            alert("Post created successfully");
            setRedirect(true);
        }
        else if(response.status===500){
            alert("fill all the fields correctly");
        }
        else{
            alert("failed to create post");
        }
    }

    if(redirect){
        // return <Navigate to={'/'}/>
        window.history.back();
    }
    if(!userInfo) {
        // console.log("username:",userInfo.username);
        // console.log("cotrol is reaching here");
        return <Navigate to={'/'}/>
    }
  return (
    <>
    <div className='flex justify-center items-center '>
        <form onSubmit={createNewPost} className='screen w-[70%]'>
            <input type='title' 
                placeholder='Title' 
                value={title} 
                onChange={(e)=> {setTitle(e.target.value)}}></input>

            <input type='summary' 
                placeholder='Summary'
                value={summary}
                onChange={(e)=>setSummary(e.target.value)}></input>

            <input type='file'
                    onChange={e=>setFiles(e.target.files)}></input>

            <Editor value={content} onChange={setContent} />

            <button style={{marginTop:'7px'}}>Create Post</button>
        </form>
    </div>
    
    </>
  )
}

export default CreatePost