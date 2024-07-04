import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = props => {
  const [content, setContent] = useState('');

  const changeInputHandler = event => {
    setContent(event.target.value);
  };

  const submitHandler = async  event => {
    event.preventDefault();

    await axios.post(`http://posts.com/posts/${props.postId}/comments`,
        {
            content
        }
    );
    setContent('');
  };

   return (
     <div> 
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label> New Comment </label>
                <input value={content} onChange={changeInputHandler} className="form-control" />
            </div>
            <br />
            <button className="btn btn-primary"> Submit </button>
        </form>
     </div>
   )
};

export default CommentCreate;