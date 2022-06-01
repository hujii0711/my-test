import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

//api.get(`/api/posts?${queryString}`);
posts.get('/', postsCtrl.list);

//api.post('/api/posts', { title, body, tags });
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id

//api.get(`/api/posts/${id}`);
//URL: http://localhost:3000/api/posts/62416b96e94c502434280b7c
//Method: GET
post.get('/', postsCtrl.read);

//api.delete(`/api/posts/${id}`);
//URL: http://localhost:3000/api/posts/62416b96e94c502434280b7c
//Method: DELETE
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);

//api.patch(`/api/posts/${id}`, { title, body, tags });
//URL: http://localhost:3000/api/posts/62416b96e94c502434280b7c
//Method: PATCH
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

//http://localhost:3000/@test/62416b96e94c502434280b7c
posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
