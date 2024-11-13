import React, {useEffect, useMemo, useRef, useState} from 'react';
// import Counter from "./components/Counter/Counter";
import PostList from "../../components/PostList/PostList";
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";
import PostForm from "../../components/PostForm/PostForm";
import Select from "../../components/Ui/Select/Select";
import PostFilter from "../../components/PostFilter/PostFilter";
import Modal from "../../components/Ui/Modals/Modal";
import {usePosts} from "../../components/hooks/usePosts";
import axios from "axios";
import PostService from "../../API/PostService";
import {useFetching} from "../../components/hooks/useFetching";
import {getPageCount, getPagesArray} from "../../utils/pages";
import Pagination from "../../components/Ui/Pagination/Pagination";

function Posts() {
  const [value, setValue] = React.useState('lorem ipsum')
  const [posts, setPosts] = useState([
    {id: 1, title: 'Ja', body: 'Lorem ipsum dolor sit amet.'},
    {id: 2, title: 'ascript 2', body: ' ipsum dolor sit amet.'},
    {id: 3, title: 'ript 3', body: ' dolor sit amet.'},
    {id: 4, title: 'pt 4', body: ' sit amet.'}
  ])
// ==========================
  const [isPostsLoading, setIsPostsLoading] = useState(false)
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
  // const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })
  //   const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
  //   const response = await PostService.getAll(limit, page)
  //   setPosts(response.data)
  //   console.log(response.headers['x-total-count'])
  //   setTotalCount(response.headers['x-total-count'])
  // })
  //
  //
  // const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
  //   const posts = await PostService.getAll()
  //   setPosts(posts)
  // })
  // =====================
  const changePage = (page) => {
    setPage(page)
  }
  // =====================
  useEffect(() => {
    fetchPosts()
  }, [page])
  // =====================
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }
  // =====================
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }
  // const sortPosts  = (sort) => {
  //   setSelectedSort(sort);
  // }
  return (
    <div className="App">
      <hr style={{margin: '15px 0 0 0'}}/>
      <button onClick={fetchPosts}>fetchPosts</button>
      <hr style={{margin: '15px 0 0 0'}}/>
      <Button onClick={() => setModal(true)}>
        Create post
      </Button>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </Modal>
      
      <hr style={{margin: '15px 0', border: '1px solid grey'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {isPostsLoading
        ? <h1>Loading...</h1>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Post list'/>
      }
      <hr style={{margin: '15px 0 0 0'}}/>
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
      {/*<Counter />*/}
    </div>
  );
}

export default Posts;
// const [title,setTitle] = useState('')
//  const [text, setText] = useState('')
// const bodyInputRef=useRef();