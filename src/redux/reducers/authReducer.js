const initialState = {
  isLoggedIn: !!localStorage.getItem('user'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
  error: null,
};

console.log('Initial State:', initialState);

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      console.log('User stored in localStorage:', localStorage.getItem('user'));

      return { ...state, isLoggedIn: true, user: action.payload, loading: false };

    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return { ...state, isLoggedIn: false, user: null, loading: false, error: action.payload };

    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null, error: null };

    default:
      return state;
  }
};

export default authReducer;
