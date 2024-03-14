import {formatISO9075} from "date-fns"
import { Link } from "react-router-dom";

export default function Post({_id,title, summary,cover,content,createdAt,author}){
  //console.log("author is here :" , author);
  return (
    <div className="post">
        <div className="image">
          <Link to={`post/${_id}`}>
            <img src={'https://weblogs-3hui.onrender.com/'+cover} alt="Image"></img>  
          </Link>
          
        </div>
        <div className="texts">
          <Link to={`post/${_id}`}>
            <h2>{title}</h2>  
          </Link>
          
          <p className="info">
            <Link className="author" to={`/${author}`}>@{author}</Link>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
    </div>
  )
}
    