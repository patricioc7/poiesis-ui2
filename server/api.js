const api = require('express').Router();
const request = require('request');

//const apiBaseUrl = 'https://poiesis-api.herokuapp.com/';
const apiBaseUrl = 'http://localhost:8080/';
const clientSecret = 'wolololoaka';

///////USER METHODS
//User Login
api.post('/users/authenticate/', (req, res) => {
    request.post(
        apiBaseUrl + '/user/login',
        {
            json: {
                email: req.body.email,
                password: req.body.password,
            },
            headers: {
                'Content-Type': 'application/json',
                'x-clientSecret': clientSecret,
            },
        },
        (error, res2, body) => {
            if (error) {
                console.error(error);
                res.status(500);
            }
            console.log('este es el bodi', body);
            res.status(200).json({ jwt: body.token, userName: body.name, userId: body.userId });

        },
    );
});

//User Registration
api.post('/users/register/', (req, res) => {
    request.post(
        apiBaseUrl + '/user/register',
        {
            json: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
            headers: {
                'Content-Type': 'application/json',
                'x-clientSecret': clientSecret,
            },
        },
        (error, res2, body) => {

            if (error) {
                console.error(error);
                return;
            }
            res.status(200).json({ body });
        },
    );
});



/////POST METHODS
//New Post
api.post('/post/new/', (req, res) => {
    request.post(
        apiBaseUrl + '/post/new',
        {
            json: {
                title: req.body.title,
                userId: req.body.userId,
                content: req.body.content,
                password: req.body.password,
            },
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': clientSecret,
            },
        },
        (error, res2, body) => {

            if (error) {
                console.error(error);
                return;
            }
            res.status(200).json({ body });
        },
    );
});

//Get individual post by ID
api.post('/post/', (req, res) => {
    console.log("////////GETTING POST " + req.body.postId + " FROM  API");
    console.log(req.body);
    request.get(
        apiBaseUrl + '/post/' + req.body.postId,
        {
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': clientSecret,
            },
        },
        (error, res2, body) => {

            if (error) {
                console.error(error);
                return;
            }
            console.log(res2);
            console.log(body);
            res.status(200).json({ body });
        },
    );
});

//Get all post by userId
api.get('/getAllPostsByUser/', (req, res) => {
    console.log("////////GETTING ALL POSTS FORM USER" + req.body.userId + " FROM  API");
    request.get(
        apiBaseUrl + '/post/user/' + req.body.userId,
        {
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': clientSecret,
            },
        },
        (error, res2, body) => {

            if (error) {
                console.error(error);
                return;
            }
            console.log(res2);
            console.log(body);
            res.status(200).json({ body });
        },
    );
});

//Get all post by userId
api.post('/getAllPosts/', (req, res) => {
    console.log("////////GETTING ALL POSTS FORM API");
    request.get(
        apiBaseUrl + '/post/',
        {
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': clientSecret,
            },
        },
        (error, res2, body) => {

            if (error) {
                console.error(error);
                return;
            }
            res.status(200).json({ body });
        },
    );
});

///Dummy get
api.get('/holis/', (req, res) => {
    res.status(200).json({ message: 'ahi va!' });
});

module.exports = api;
