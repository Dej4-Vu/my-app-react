import axios from 'axios';


export const userLoggedIn = (user) => ({
  type: 'USER_LOGGED_IN',
  user
});

export const userLoggedOut = () => ({
  type: 'USER_LOGGED_OUT'
});

export const login = data => dispatch =>
  axios.post('/api/auth', { data })
    .then(res => res.data.user)
    .then(user => {
      localStorage.token = user.token;
      dispatch(userLoggedIn(user));
    });


export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(userLoggedOut());
}
