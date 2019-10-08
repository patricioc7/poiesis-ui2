import { authHeader } from '../_helpers/authHeader';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

const apiUrl = '/api';

function login(username, pass) {
  console.log('entró4');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: username, password: pass }),
  };

  return fetch(`${apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log('llego user', user)
      console.log('Guardando user en LS');
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    }).catch(error => {
            throw error
      }

      );
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(
    handleResponse,
  );
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/register`, requestOptions).then(
    handleResponse,
  );
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse,
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(
    handleResponse,
  );
}

function handleResponse(response) {
  console.log(response.body);
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
