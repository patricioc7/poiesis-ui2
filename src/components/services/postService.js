import { authHeader } from '../_helpers/authHeader';

export const postService = {
    getPost,
    getRecentPosts,
    newPost,

};

const apiUrl = '/api';

function getPost(id, jwt) {
    console.log('entró4');
    console.log("/77777777777777", id, jwt)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, token: jwt}),
    };

    return fetch(`${apiUrl}/post`, requestOptions)
        .then(handleResponse)
        .then(post => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('llego post', post)
            return post;
        }).catch(error => {
                throw error
            }
        );
}

function getRecentPosts(jwt) {
    console.log('entró4');
    console.log("/77777777777777", jwt)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: jwt}),
    };

    return fetch(`${apiUrl}/getAllPosts`, requestOptions)
        .then(handleResponse)
        .then(post => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('llego post', post)
            return post;
        }).catch(error => {
                throw error
            }

        );
}

function newPost(jwt, title, content, userId) {
    console.log('entró4');
    console.log("/77777777777777", jwt)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: jwt, content : content, title : title, userId: userId}),
    };

    return fetch(`${apiUrl}/post/new`, requestOptions)
        .then(handleResponse)
        .then(post => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('llego post', post)
            return post;
        }).catch(error => {
                throw error
            }

        );
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('DATA', data);
        console.log(response.status)
        if (!response.ok || response.status == 500)  {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            console.log("entro en error handle response")
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("entro en handle response", data)
        return data;
    });
}
