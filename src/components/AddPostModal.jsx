// AddPostModal.js
import React, {useState} from 'react';
import {Modal, Box, Typography, TextField, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddPostModal = ({open, onClose, onAddPost}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);
  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      setErrorMessage('Both fields are required');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      setErrorMessage('You must be logged in to add a post.');
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title,
          body,
          userId: 1, // Здесь нужно использовать реальный userId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      onAddPost(response.data); // Добавляем новый пост в список
      setTitle('');
      setBody('');
      onClose(); // Закрываем модалку
    } catch (error) {
      setErrorMessage('Failed to add post');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{padding: 3, maxWidth: 500, margin: 'auto', backgroundColor: 'white', borderRadius: 2}}>
        <Typography variant="h6" gutterBottom>Add New Post</Typography>
        
        
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          sx={{marginBottom: 2}}
        />
        <TextField
          label="Body"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={handleBodyChange}
          sx={{marginBottom: 2}}
        />
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Add Post'}
        </Button>
      </Box>
    </Modal>
  );
};
export default AddPostModal;
