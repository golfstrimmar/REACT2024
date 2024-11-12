import "./PostForm.scss";

import React, {useState} from 'react';
import Input from "../Ui/Input/Input";
import Button from "../Ui/Button/Button";
const PostForm = ({create}) => {
const [post,setPost]=useState({title:'',text:''})


const addNewPost= (e) => {
    e.preventDefault();
    if (!post.title ==''&&!post.text==''){
      const newPost={
        ...post, id: Date.now()
      }
      setPost({ title: '',text:''})
      create(newPost)
      // setPosts([...posts,{...post, id: Date.now()}])
      // setPost({...post, title: ''})
      // setPost({...post, text: ''})
    }
  
    //   const newPost = {
    //    id: Date.now(),
    //     title:title,
    //     text:text,
    //   }
    //   console.log(newPost)
    // if (!title ==''&&!text==''){
    //   setPosts([...posts,newPost])
    //   setTitle('')
    //   setText('')
    // }
    // console.log(title)
    // console.log(text)
}

return (
    <form action="post" className='postForm'>
      <Input value={post.title} label={'Post title'} onChange={(e) => setPost({...post, title: e.target.value})}/>
      <Input value={post.text} label={'Post text'} onChange={(e) => setPost({...post, text: e.target.value})}/>
      {/*неуправляемый компонент   <Input ref={bodyInputRef}/>  */}
      <Button onClick={addNewPost}>add post</Button>
    </form>
  );
};
export default PostForm;
  