import "./PostItem.scss";
import React from 'react';
import Button from "../Ui/Button/Button";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate()
  return (
    <div className="postitem">
      <div className="postitem-content">
        <h2 className="postitem-title">
          {props.post.id}. {props.post.title}
        </h2>
        <p className="postitem-text">
          {props.post.body}
        </p>
        <div className="postitem-btns">
          <Button onClick={() => navigate(`/posts/${props.post.id}`)}>Open</Button>
          <Button onClick={() => props.remove(props.post)}>Delite</Button>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
  