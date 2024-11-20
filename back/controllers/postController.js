import fs from 'fs';
import path from 'path';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const getAll = async (req, res) => {
  try {
    // Получаем параметры сортировки с фронтенда
    const {sortBy = 'createdAt', order = 'desc'} = req.query;
    // Формируем параметры сортировки для MongoDB
    const sortOptions = {[sortBy]: order === 'asc' ? 1 : -1};
    // Выполняем запрос к базе с учетом сортировки
    const posts = await Post.find()
      .populate('user') // Заполняем поле user
      .sort(sortOptions) // Применяем сортировку
      .exec();
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
// -------------------------------
export const remove = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }
    // Удаляем все комментарии, связанные с этим постом
    await Comment.deleteMany({postId: post._id});
    // Удаляем сам пост
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'Post and related comments deleted successfully'});
  } catch (err) {
    res.status(500).json({message: 'Failed to delete post and comments', error: err.message});
  }
};
// ------------------------------
export const create = async (req, res) => {
  try {
    const {title, text, tags, imageUrl} = req.body; // Здесь imageUrl должен приходить через тело запроса
    const newPost = new PostModel({
      title,
      text,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      imageUrl,
      user: req.userId,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({message: 'Failed to create post.'});
  }
};
// export const create = async (req, res, imageUrl) => {
//   try {
//     let newTags = req.body.tags;
//     if (typeof newTags === 'string') {
//       newTags = newTags
//         .split(',')
//         .map(tag => tag.trim())
//         .filter(tag => tag.length > 0);
//     }
//     const post = new Post({
//       title: req.body.title,
//       text: req.body.text,
//       tags: newTags || [],
//       user: req.userId,
//       imageUrl,
//     });
//     const savedPost = await post.save();
//     res.status(201).json(savedPost);
//   } catch (err) {
//     console.error('Error in controller:', err);
//     res.status(500).json({error: 'Failed to create post.'});
//   }
// };
// ---------------------------
export const update = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, text, tags, imageUrl} = req.body;
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        text,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
        imageUrl, // Обновляем поле с URL изображения
      },
      {new: true}
    );
    if (!updatedPost) {
      return res.status(404).json({message: 'Post not found.'});
    }
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({message: 'Failed to update post.'});
  }
};
// export const update = async (req, res, imageUrl) => {
//   try {
//     const postId = req.params.id;
//     const existingPost = await Post.findById(postId);
//     if (!existingPost) {
//       return res.status(404).json({message: 'Post not found'});
//     }
//     const updatedData = {
//       title: req.body.title || existingPost.title,
//       text: req.body.text || existingPost.text,
//       tags: req.body.tags
//         ? Array.isArray(req.body.tags)
//           ? req.body.tags
//           : req.body.tags
//             .split(',')
//             .map(tag => tag.trim())
//             .filter(tag => tag.length > 0)
//         : existingPost.tags,
//       user: existingPost.userId,
//       imageUrl: imageUrl || existingPost.imageUrl, // Оставляем старое изображение, если новое не было передано
//     };
//     const updatedPost = await Post.findByIdAndUpdate(
//       postId,
//       updatedData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).populate('user');
//     res.status(200).json(updatedPost);
//   } catch (err) {
//     console.error('Error updating post:', err);
//     res.status(500).json({message: 'Server error', error: err});
//   }
// };
