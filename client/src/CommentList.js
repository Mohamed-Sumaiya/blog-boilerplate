import React from 'react';

const CommentList = props => {

/* The below commented out code was used to fetch comments throught the comment service.
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:4001/posts/${props.postId}/comments`)
      
      setComments(response.data);
    };

    fetchComments();
  }, []);
*/
  const renderedComments = props.comments.map(comment => {
    let content;

    if(comment.status === 'approved') {
      content = comment.content;
    }

    if(comment.status === 'pending') {
      content = 'This comment is awaiting moderation';
    }

    if(comment.status === 'rejected') {
      content = 'This comment has been rejected!';
    }
    return <li key={comment.id}> {content} </li>
  }) 

    return (
       <ul>
         {renderedComments}
       </ul>
    )
}

export default CommentList;
