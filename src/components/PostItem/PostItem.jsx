import "./PostItem.scss";
import React from 'react';
import Button from "../Ui/Button/Button";
const PostItem = (props) => {
  return (
    <div className="postitem">
        <div className="postitem-content">
            <h2 className="postitem-title">
              {props.number}. {props.post.title}
            </h2>
            <p className="postitem-text">
              {props.post.text}
            </p>
            <div className="postitem-btns">
              <Button onClick={  () => props.remove(props.post) }>Delite</Button>
            </div>
        </div>
    </div>
  );
};

export default PostItem;
  