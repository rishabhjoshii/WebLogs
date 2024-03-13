import Post from "../Post";
import {useEffect, useState} from "react";
import { Audio,ColorRing } from 'react-loader-spinner'
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";


export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:3000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);
  //console.log("posts is here:" , posts);

  if(loading){
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
      <Dashboard/>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
      
      <hr/>
      <footer className="gap-2" >
      <div>Made with ❤️ by Rishabh </div>
      <nav>
          <a class="text-xs hover:underline underline-offset-4" >
          Copyright © 2024. All rights reserved.
        </a>
          <a class="text-xs hover:underline underline-offset-4" >
          Terms of Service
        </a>
        <a class="text-xs hover:underline underline-offset-4" >
          Privacy
        </a>
      </nav>
     </footer>
    
    </>
  );
}