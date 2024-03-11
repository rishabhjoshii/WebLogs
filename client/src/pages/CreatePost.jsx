import React, { useState,useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Editor from '../Editor';


const CreatePost = () => {
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [files,setFiles] = useState("");
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo,userInfo} = useContext(UserContext);

    //console.log("userInfo is here:" , userInfo);

    async function createNewPost(e){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]); 
        data.set('username', userInfo.username);
        e.preventDefault();

        //fetch call
        const response = await fetch('http://localhost:3000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if(response.ok){
            alert("Post created successfully");
            setRedirect(true);
        }
        if(response.status===500){
            alert("fill all the fields correctly");
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    if(!userInfo) return <Navigate to={'/'}/>
  return (
    <form onSubmit={createNewPost}>
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

        <Editor value={content} onChange={setContent}/>

        <button style={{marginTop:'5px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost