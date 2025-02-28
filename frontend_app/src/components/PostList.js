import React from 'react';

const PostList = ({ posts, onEdit, onDelete }) => {
    return (
        <div>
            {posts.map((post) => (
                <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button onClick={() => onEdit(post)}>Edit</button>
                    <button onClick={() => onDelete(post._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
