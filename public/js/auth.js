import axios from 'axios';
import { showAlert } from './alerts';
// login form
export const login = ({ email, password }, endPoint) => {
  axios({
    method: 'POST',
    url: `${window.location.origin}${endPoint}`,
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', 'You have logged in', 'body');
        window.setTimeout(() => {
          window.location.assign('/');
        }, 500);
      }
    })
    .catch((err) => {
      showAlert('error', err.response.data.message, 'body');
    });
};

export const logout = () => {
  axios({
    method: 'GET',
    url: `${window.location.origin}/api/v1/users/logout`,
  })
    .then((res) => {
      showAlert('success', 'You have logged out successfully', 'body');
      window.setTimeout(() => {
        window.location.assign('/');
      }, 500);
    })
    .catch((e) => {
      showAlert('error', e.response.data.message, 'body');
    });
};
