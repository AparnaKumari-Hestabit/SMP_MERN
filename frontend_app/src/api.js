import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:2032/posts' });

export const fetchPosts = () => API.get('/');
// export const createPost = (newPost) => API.post('/', {
//     body: JSON.stringify({newPost})
// }
// );
export const createPost = (newPost) => API.post('/', newPost);
export const updatePost = (id, updatedPost) => API.put(`/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/${id}`);
