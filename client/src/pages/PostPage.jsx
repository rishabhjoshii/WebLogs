import { format, formatISO9075 } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const param = useParams();
    // console.log(param);
    const id = param.id;

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
          .then(response => {
            response.json().then(postInfo => {
              setPostInfo(postInfo);
            });
          });
      }, []);
    

    if(!postInfo) return '';
    console.log(postInfo);

    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>by @{postInfo.author}</div>
            <div className='image'>
                <img src={`http://localhost:3000/${postInfo.cover}`} alt="Image"/>
            </div>
            
            <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    )
}

export default PostPage