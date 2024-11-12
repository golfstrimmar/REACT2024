import React, {useMemo, useRef, useState} from 'react';
import Counter from "./components/Counter/Counter";
import PostList from "./components/PostList/PostList";
import Button from "./components/Ui/Button/Button";
import Input from "./components/Ui/Input/Input";
import PostForm from "./components/PostForm/PostForm";
import Select from "./components/Ui/Select/Select";
import PostFilter from "./components/PostFilter/PostFilter";
import Modal from "./components/Ui/Modals/Modal";
import {usePosts} from "./components/hooks/usePosts";

function App() {
  const [value, setValue] = React.useState('lorem ipsum')
  const [posts, setPosts] = useState([
    {id: 1, title: 'Ja', text: 'Lorem ipsum dolor sit amet.'},
    {id: 2, title: 'ascript 2', text: ' ipsum dolor sit amet.'},
    {id: 3, title: 'ript 3', text: ' dolor sit amet.'},
    {id: 4, title: 'pt 4', text: ' sit amet.'}
  ])
// ==========================
  const [modal, setModal] = useState(false)
// ==========================
  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState({sort: '', query: ''})
  // =================================================
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  // const sortedPosts = useMemo(() => {
  //     if(filter.sort){
  //     return  [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  //     }else{
  //       return posts;
  //     }
  // },[filter.sort,posts])
  // const sortedAndSearchedPosts = useMemo(()=>{
  // return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query))
  // },[filter.query, sortedPosts])
  // function getSortedPosts() {
  //   console.log('getSortedPosts function')
  //   if(selectedSort){
  //   return  [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
  //   }else{
  //     return posts;
  //   }
  // }
  //
  // const sortedPosts = getSortedPosts()
  // =====================
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }
  // const sortPosts  = (sort) => {
  //   setSelectedSort(sort);
  // }
  return (
    <div className="App">
      <hr style={{margin: '15px 0 0 0'}}/>
      <Button onClick={() => setModal(true)}>
        Create post
      </Button>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </Modal>
      
      <hr style={{margin: '15px 0', border: '1px solid grey'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Post list'/>
      
      {/*<Counter />*/}
    </div>
  );
}

export default App;
// const [title,setTitle] = useState('')
//  const [text, setText] = useState('')
// const bodyInputRef=useRef();