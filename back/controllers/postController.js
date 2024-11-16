import fs from 'fs';
import path from 'path';
import Post from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec();
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({error: 'Invalid post ID'});
    }
    const doc = await Post.findOneAndUpdate(
      {_id: postId},
      {$inc: {viewsCount: 1}},
      {new: true}
    );
    if (!doc) {
      return res.status(404).json({error: 'No post found.'});
    }
    res.json(doc);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await Post.findOneAndDelete({_id: postId});
    if (!doc) {
      return res.status(404).json({error: 'Post not found'});
    }
    const filePath = path.join('uploads', doc.imageUrl.split('/').pop());
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error while deleting image:', err);
      } else {
        console.log('Image deleted successfully');
      }
    });
    res.json({
      success: true,
      message: 'Post successfully deleted',
    });
  } catch (err) {
    console.error('Error while deleting post:', err);
    res.status(500).json({error: 'Server error'});
  }
};
export const create = async (req, res, imageUrl) => {
  try {
    let newTags = req.body.tags;
    if (typeof newTags === 'string') {
      newTags = newTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    }
    // Создаем новый пост
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      tags: newTags || [],
      user: req.userId,
      imageUrl,
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error in controller:', err);
    res.status(500).json({error: 'Failed to create post.'});
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error('Error while deleting post:', err);
    res.status(500).json({error: 'Server error'});
  }
}
