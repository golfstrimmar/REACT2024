// /controllers/PostController.js
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
    res.json({
      success: true,
      message: 'Post successfully deleted',
    });
  } catch (err) {
    console.error('Error while deleting post:', err);
    res.status(500).json({error: 'Server error'});
  }
}
export const create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
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
