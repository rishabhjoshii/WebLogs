import Post from "../Post";
import {useEffect, useState} from "react";
import { Audio,ColorRing } from 'react-loader-spinner'
import Dashboard from "./Dashboard";


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
    <footer >
     <div>Made with ❤️ by Rishabh </div>
      <nav >
        
        <a>Copyright © 2024. All rights reserved.</a>
        <a >
          Terms of Service
        </a>
        <a >
          Privacy
        </a>
      </nav>
    </footer>
    </>
  );
}