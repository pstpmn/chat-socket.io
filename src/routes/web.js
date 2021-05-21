const express = require('express');
const router = express.Router();
const index = require('../controllers/index.controller')
const profile = require('../controllers/profile.controller')
const register = require('../controllers/register.controller')
const posts = require('../controllers/posts.controller')

const auth = require('../middleware/auth');
const upload = require(".././middleware/img.upload")

let routes = (app) => {
    // index page
    router.get('/',index.IndexPage);
    router.get('/index',index.IndexPage);
    router.get('/profile',auth,profile.profilePage);
    router.get('/main',auth,profile.mainPage);

    router.post('/login',index.loginAuth);
    router.post('/register',register.setRegis);

    router.post('/posts/adding',auth,posts.setAddPost);
    router.get('/posts/all',auth,posts.getPosts);

    router.get('/posts/topic/:topicId',auth,posts.topicPage);
    router.post('/posts/topic/comment/adding',auth,posts.setAddComment);
    router.post('/posts/topic/delete',auth,posts.setDelPost);
    router.post('/posts/topic/comment/delete',auth,posts.setDelComment);



    return app.use("/", router);
} 

module.exports = routes;