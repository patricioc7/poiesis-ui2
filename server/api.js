const api = require('express').Router();
const request = require('request');

api.get('/holis/', (req, res) => {
  res.status(200).json({ message: 'ahi va!' });
});
///////USER METHODS
//User Login
api.post('/users/authenticate/', (req, res) => {
    console.log("////////LOGGIN USER");
  request.post(
    'http://localhost:8080/user/login',
    {
      json: {
        email: req.body.email,
        password: req.body.password,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-clientSecret': 'wolololoaka',
      },
    },
    (error, res2, body) => {
      if (error) {
        console.error(error);
        res.status(500);
      }
      console.log('este es el bodi', body);

      res.status(200).json({ jwt: body.token, userName: body.name });


    },
  );
});

//User Registration
api.post('/users/register/', (req, res) => {
    console.log("////////REGISTERING USER");
    request.post(
        'http://localhost:8080/user/register',
        {
            json: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
            headers: {
                'Content-Type': 'application/json',
                'x-clientSecret': 'wolololoaka',
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



/////POST METHODS
//New Post
api.post('/post/new/', (req, res) => {
    console.log("////////WRITTING NEW POST TO API");
    request.post(
        'http://localhost:8080/post/new',
        {
            json: {
                name: req.body.name,
                userId: req.body.userId,
                content: req.body.content,
                password: req.body.password,
            },
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': 'wolololoaka',
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

//Get individual post by ID
api.get('/post/', (req, res) => {
    console.log("////////GETTING POST " + req.body.postId + " FROM  API");
    request.get(
        'http://localhost:8080/post/' + req.body.postId,
        {
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': 'wolololoaka',
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
        'http://localhost:8080/post/user/' + req.body.userId,
        {
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': 'wolololoaka',
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
api.get('/getAllPosts/', (req, res) => {
    console.log("////////GETTING ALL POSTS FORM API");
    request.get(
        'http://localhost:8080/post/',
        {
            headers: {
                'authorization': req.body.token,
                'Content-Type': 'application/json',
                'x-clientSecret': 'wolololoaka',
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

module.exports = api;
