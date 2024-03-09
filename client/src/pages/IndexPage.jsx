import Post from "../Post";
import {useEffect, useState} from "react";

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
  console.log("posts is here:" , posts);

  if(loading) return <div>Loading...</div>
  
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}