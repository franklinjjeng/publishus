import axios from 'axios';
import * as doc from './docActions.jsx';

export function autoLogin () {
  return function(dispatch, getState) {
    axios.get('/api/auth/checkAuth')
      .then((response) => {
        if (response.data.status === 'successful') {
          dispatch({
            type: "AUTO_LOGIN", 
            payload: response.data.username
          });
          dispatch(doc.handleChange('allDocuments', response.data.allDocuments));
        }
      }).catch((err) => {
        console.log('no prior auth');
      })
  }
}

export function setRedirectUrl (url) {
  return {
    type: "SET_REDIRECT_URL",
    payload: url
  }
}

export function toggleLoginModal () {
  return { 
    type: "TOGGLE_LOGIN_MODAL"
  }
}

export function changeView () {
  return { 
    type: "CHANGE_LOGIN_STATE"
  }
}

export function userLogin (username, password) {
  return {
    type: "USER_LOGIN",
    payload: {
      username: username,
      password: password
    }
  }
}

export function userCreated (value) {
  return {
    type: "USER_CREATED",
    payload: value
  }
}

export function authReject (value) {
  return {
    type: "USER_AUTH_REJECTED",
    payload: value
  }
}

export function login () {
  return function(dispatch, getState) {
    var user = getState().user.user;
    axios.post('/api/auth/login', {
      email: user.email,
      password: user.password
    })
    .then((response) => {
      dispatch(userCreated(response.data));
      dispatch(doc.handleChange('allDocuments', response.data.allDocuments));
    })
    .catch((err) => {
      dispatch(authReject(err));
    })
  }
}

export function signup () {
  return function(dispatch, getState) {
    var user = getState().user.user;
    axios.post('/api/auth/signup', {
      email: user.email,
      username: user.username,
      password: user.password
    })
    .then((response) => {
      dispatch(userCreated(response.data));
      dispatch(doc.handleChange('allDocuments', response.data.allDocuments));
    })
    .catch((err) => {
      dispatch(authReject(err));
    })
  }
}

export function userLogout () {
  return function(dispatch) {
    axios.get('/api/auth/logout')
    .then((response) => {
      dispatch({
        type: "USER_LOGOUT",
        payload: response.data
      })
    })
    .catch((err) => {
      dispatch(authReject(err));
    })
  }
}