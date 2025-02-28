import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/auth.js";
const { authenticateToken } = authMiddleware;

const router = express.Router();

// Create a new post (Protected)
router.post('/posts', authenticateToken, async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.userId,
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts (Protected)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a post (Protected)
router.put('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post (Protected)
router.delete('/posts/:id', authenticateToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 