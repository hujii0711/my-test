import qs from 'qs';
import api from './client';

export const writePost = ({ title, body, tags }) =>
  api.post('/api/posts', { title, body, tags });

export const readPost = id => api.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return api.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, tags }) =>
  api.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = id => api.delete(`/api/posts/${id}`);
