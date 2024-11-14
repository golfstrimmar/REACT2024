import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {CircularProgress, TextField, Button, Modal, Box, Typography, Divider} from '@mui/material';
import {Link} from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import './PostPage.scss'
import ErrorModal from '../../components/ErrorModal/ErrorModal';
// ==================
const PostPage = () => {
  const {id} = useParams(); // Получаем id из URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false); // Для модалки
  const [errorMessage, setErrorMessage] = useState('You must be logged in to comment.');
  // ==============
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
        setUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post data');
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id]); // Зависимость от id
  // ==============
  // Обработчик изменения текста комментария
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  // ==============
// Функция для отправки комментария
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const userToken = localStorage.getItem('token'); // Получаем токен из localStorage
      if (userToken == null) {
        setErrorMessage('You must be logged in to comment.');
        setOpenErrorModal(true); // Открываем модалку с ошибкой
        setIsSubmitting(false);
        setTimeout(() => {
          setOpenErrorModal(false); // Закрываем модалку через 2 секунды
        }, 2000);
        return;
      }
      // Отправляем новый комментарий на сервер
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/comments',  // Поменяйте на ваш бэкэнд
        {
          postId: id,
          body: newComment,
          userId: 1,  // Замените на реальный userId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,  // Отправляем токен для авторизации
          },
        }
      );
      // Добавляем новый комментарий в список
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment('');
    } catch (err) {
      setErrorMessage('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };
  // ==============
  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress/>
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  // ==============
  return (
    <div className="post-page">
      <Box sx={{maxWidth: 800, margin: '0 auto', padding: 3}}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.body}
        </Typography>
        
        {user && (
          <Box sx={{marginBottom: 3}}>
            <Typography variant="h6">Posted by: {user.name}</Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
            <Typography variant="body2">Phone: {user.phone}</Typography>
            <Typography variant="body2">Website:
              <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
            </Typography>
          </Box>
        )}
        
        <Divider sx={{marginBottom: 2}}/>
        
        <Box sx={{marginBottom: 3}}>
          <Typography variant="h5" component="h2" gutterBottom>
            Comments
          </Typography>
          
          {/* Форма для добавления комментария */}
          <div className="add-comment-form">
            <TextField
              label="Add a Comment"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              disabled={isSubmitting}
              startIcon={<CommentIcon/>}
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </Button>
          </div>
          
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Box key={comment.id} sx={{marginBottom: 2}}>
                <Typography variant="h6">{comment.name}</Typography>
                <Typography variant="body2" color="textSecondary">{comment.email}</Typography>
                <Typography variant="body1" paragraph>{comment.body}</Typography>
                <Divider/>
              </Box>
            ))
          ) : (
            <Typography>No comments available</Typography>
          )}
        </Box>
        
        <Box sx={{marginTop: 2}}>
          <Button variant="outlined" color="primary">
            <Link to="/posts" style={{textDecoration: 'none', color: 'inherit'}}>Back to Posts page</Link>
          </Button>
        </Box>
      </Box>
      <ErrorModal
        open={openErrorModal}
        message={errorMessage}
        onClose={() => setOpenErrorModal(false)}
      />
    </div>
  );
};
export default PostPage;
