import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; // Для создания ссылок
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="home">
      <h1>Posts</h1>
      {posts.map(post => (
        <Card sx={{minWidth: 275}}>
          <CardContent>
            <h2>
              <Link to={`/post/${post.id}`}>{post.id}. {post.title}</Link>
            </h2>
            <Typography variant="h5" component="div">
              {post.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default Home;
