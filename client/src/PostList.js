import React, { useState, useEffect} from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
 const [posts, setPosts] = useState({}); // default value reflects what you will store inside the state.
 
 useEffect(() => {
    const fetchPosts = async () => {
        const response = await axios.get('http://posts.com/posts'); // where our query service is running.
      
        setPosts(response.data);
    };

    fetchPosts();
 }, []);

 // Ibject.values is a built in javascript function that will turn the object values into an array.
 const renderedPosts = Object.values(posts).map(post => {
    return <div key={post.id} className="card" style={{ width: '30%', marginBottom: '20px'}}>
       <div className="card-body">
          <h3> {post.title} </h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
       </div>
    </div>
 })

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between"> {renderedPosts} </div>
  )
};

export default PostList;