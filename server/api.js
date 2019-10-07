const api = require('express').Router();
const request = require('request');

api.get('/holis/', (req, res) => {
  res.status(200).json({ message: 'ahi va!' });
});

api.post('/users/authenticate/', (req, res) => {
    console.log("ENTRO EN LA API")
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

module.exports = api;
