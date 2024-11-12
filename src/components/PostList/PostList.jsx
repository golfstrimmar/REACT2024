import React, {useState} from 'react';
import PostItem from "../PostItem/PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
  if (!posts.length) {
    return <h2 className="postitem-title"> No posts </h2>
  }
  return (
    <div className="postlist">
      <h2>{title}</h2>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={index + 1} post={post}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
export default PostList;
  