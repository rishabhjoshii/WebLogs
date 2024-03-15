import React, { useState,useContext, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Editor from "../Editor";

const EditPost = () => {
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [files,setFiles] = useState("");
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo,userInfo} = useContext(UserContext);
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://weblogs-3hui.onrender.com/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    //console.log("postInfo is here ", postInfo);
                    setTitle(postInfo.postDoc.title);
                    setSummary(postInfo.postDoc.summary);
                    setContent(postInfo.postDoc.content);
                })
            })
    },[]);

    async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0]);
        }
        data.set('username', userInfo? userInfo.username : null);
        
        const response = await fetch('https://weblogs-3hui.onrender.com/post',{
            method: 'PUT',
            body: data,
            headers: {
                "token": localStorage.getItem('token')
            },
            credentials: 'include',
        });
        if(response.status === 200){
            setRedirect(true);
            alert("Post updated successfully");
        }
        // else{
        //     console.log("post update failed, response is here: ", response);
        // }
        
    }

    if(redirect){
        return <Navigate to={`/post/${id}`}/>
    }
  return (
    <div className='flex justify-center items-center '>
        <form onSubmit={updatePost} className='screen w-[70%]'>
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

            <Editor onChange={setContent} value={content} />

            <button style={{marginTop:'5px'}}>Update Post</button>
        </form>
    </div>
    
  )
}

export default EditPost