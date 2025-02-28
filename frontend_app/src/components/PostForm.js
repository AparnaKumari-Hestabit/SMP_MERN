import React, { useState, useEffect } from 'react';

const PostForm = ({ onSave, currentPost }) => {
    const [post, setPost] = useState({ title: '', content: '' });

    useEffect(() => {
        if (currentPost) {
            setPost(currentPost); // Prefill the form for editing
        } else {
            setPost({ title: '', content: '' });
        }
    }, [currentPost]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(post);
        setPost({ title: '', content: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={post.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="content"
                placeholder="Post Content"
                value={post.content}
                onChange={handleChange}
                required
            ></textarea>
            <button type="submit">{currentPost ? 'Update' : 'Create'} Post</button>
        </form>
    );
};

export default PostForm;
