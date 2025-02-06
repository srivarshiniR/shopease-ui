import { loginUserApi, signupUserApi, logoutUserApi } from '../../utils/api';
import { setAuthToken, clearAuthToken } from '../../utils/auth';

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });

    const data = await loginUserApi(credentials);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: data.user,
    });

    setAuthToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    navigate('/');
  } catch (error) {
    const errorMsg = error.response?.data?.msg || error.message || 'Login failed';
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: errorMsg,
    });
  }
};


export const signupUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'SIGNUP_REQUEST' });

    const data = await signupUserApi(userData);

    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: data.user,
    });

    setAuthToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    navigate('/');
  } catch (error) {
    const errorMsg = error.response?.data?.msg || error.message || 'Signup failed';
    dispatch({
      type: 'SIGNUP_FAILURE',
      payload: errorMsg,
    });
  }
};


export const logoutUser = () => (dispatch) => {
  logoutUserApi();

  dispatch({ type: 'LOGOUT' });
};
