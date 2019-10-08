const index = require('express').Router();
const request = require('request');

index.get('/holis/', (req, res) => {
    res.status(200).json({ message: 'ahi va!' });
});

index.post('/users/authenticate/', (req, res) => {
    console.log("entro al post");
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
                return;
            }
            console.log(res2);
            console.log(body);
            res.status(200).json({ jwt: body.token, userName: body.name });
        },
    );
});

module.exports = index;
