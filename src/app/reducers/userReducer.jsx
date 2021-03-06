export default function reducer(state = {
  login: false,
  loginModal: false,
  user: {
    username: '',
    email: '',
    password: ''
  },
  redirectUrl: '/profile',
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch(action.type) { 

    case "AUTO_LOGIN": {
      return {
        ...state,
        user: {...state.user, username: action.payload, password: '', email: ''},
        login: true
      }
    }

    case "TOGGLE_LOGIN_MODAL": {
      return {
        ...state,
        loginModal: !state.loginModal
      }
    }

    case "USER_LOGOUT": {
      return {
        ...state,
        user: {...state.user, username: '', password: '', email: ''},
        login: false
      }
    }

    case "USER_LOGOUT": {
      return {
        ...state,
        user: {...state.user, username: '', password: '', email: ''},
        login: false
      }
    }

    case "SET_REDIRECT_URL": {
      return {
        ...state,
        redirectUrl: action.payload
      }
    }

    case "EDIT_USERNAME": {
      return {
        ...state,
        user: {...state.user, username: action.payload}
      }
    }

    case "EDIT_EMAIL": {
      return {
        ...state,
        user: {...state.user, email: action.payload}
      }
    }

    case "EDIT_PASSWORD": {
      return {
        ...state,
        user: {...state.user, password: action.payload}
      }
    }
    
    case "USER_CREATED": {
      return {
        ...state, 
        user: {...state.user, username: action.payload.username, password: '', email: ''},
        login: true
      }
    }

    case "USER_AUTH_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    
  }

  return state;
}