const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    res.send('Hello, this is the blog route');
  });
router.get('/', blogController.getAllBlogs);
router.get('/create', blogController.getCreateBlog);
router.post('/create', blogController.postCreateBlog);
router.get('/:id/edit', blogController.getEditBlog);
router.post('/:id/edit', blogController.postEditBlog);
router.post('/:id/delete', blogController.deleteBlog);

exports.getCreateBlog = (req, res) => {
    res.render('blog/create');
  };
  
  exports.postCreateBlog = async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const blog = await Blog.create({ title, content, userId: req.session.userId });
      res.redirect(`/blog/${blog._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).render('blog/create', { error: 'Failed to create blog' });
    }
  };
  
  exports.getEditBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      const blog = await Blog.findById(id);
      res.render('blog/edit', { blog });
    } catch (err) {
      console.error(err);
      res.status(404).render('error', { error: 'Blog not found' });
    }
  };
  
  exports.postEditBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      await Blog.findByIdAndUpdate(id, { title, content });
      res.redirect(`/blog/${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).render('blog/edit', { error: 'Failed to update blog' });
    }
  };
  
  exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Blog.findByIdAndDelete(id);
      res.redirect('/blog');
    } catch (err) {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to delete blog' });
    }
  };

module.exports = router;
