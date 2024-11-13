import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../components/hooks/useFetching";
import PostService from "../../API/PostService";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(
    async (id) => {
      const response = await PostService.getById(params.id);
      setPost(response.data);
    }
  );
  const [fetchComments, isCommentsLoading, errorComments] = useFetching(
    async (idi) => {
      const response = await PostService.getCommentsById(params.id);
      setComments(response.data);
    }
  );
  useEffect(() => {
    fetchPostById();
    fetchComments();
  }, []);
  return (
    <div className="postidpage">
      <h1> Post page id: {post.id} </h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr style={{margin: '10px 0', border: '1px solid black'}}/>
      <h3>Comments:</h3>
      {comments.map((comm, index) => {
        return (
          <div key={index}>
            <hr style={{margin: '15px 0 15px 0', border: '1px solid black',}}/>
            <h4>{comm.email}</h4>
            <h5>{comm.name}</h5>
            <p>{comm.body}</p>
          </div>
        )
      })}
    </div>
  );
};
export default PostIdPage;
