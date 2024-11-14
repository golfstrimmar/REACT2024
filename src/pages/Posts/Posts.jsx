import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {CircularProgress, Button, Pagination} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import AddPostModal from '../../components/AddPostModal';
import './Posts.scss';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [newPost, setNewPost] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const reassignPostIds = (posts) => {
    return posts.map((post, index) => ({
      ...post,
      id: index + 1,
    }));
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const deletePost = async (postId) => {
    setDeletingPostId(postId);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      reassignPostIds(posts)
      setDeletingPostId(null);
    } catch (err) {
      setError('Failed to delete post');
      setDeletingPostId(null);
    }
  };
  const handleExited = () => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.filter((post) => post.id !== deletingPostId);
      const newPosts = reassignPostIds(updatedPosts);
      return newPosts;
    });
    setDeletingPostId(null);
  };
  // =======================
  const handleAddPost = (post) => {
    setPosts([post, ...posts]); // Добавляем новый пост в список
  };
  const handleOpenAddPostModal = () => {
    setOpenAddPostModal(true);
  };
  const handleCloseAddPostModal = () => {
    setOpenAddPostModal(false);
  };
  // =======================
  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress/>
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  return (
    <div className="page posts">
      <h1>Posts</h1>
      {/* Кнопка для добавления поста */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddPostModal}
        sx={{marginBottom: 3}}
      >
        Add New Post
      </Button>
      <TransitionGroup>
        {currentPosts.map((post) => (
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="fade-slide"
            onExited={handleExited}
          >
            <Card sx={{minWidth: 275}}>
              <CardContent>
                <Typography variant="h2" component="h1" gutterBottom>
                  <Link to={`/post/${post.id}`}>{post.id}. {post.title}</Link>
                </Typography>
                <Typography component="p">{post.body}</Typography>
                <DeleteOutlinedIcon onClick={() => deletePost(post.id)}/>
              </CardContent>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <Pagination
        count={Math.ceil(posts.length / postsPerPage)} // количество страниц
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{marginTop: 2, display: 'flex', justifyContent: 'center'}}
      />
      {/* Модалка для добавления поста */}
      <AddPostModal
        open={openAddPostModal}
        onClose={handleCloseAddPostModal}
        onAddPost={handleAddPost}
      />
    </div>
  );
};
export default Posts;