import axios from 'axios';
import { showAlert } from './alerts';

// type = 'password' || 'data'
export default (data, endPoint) => {
  return axios({
    method: 'PATCH',
    url: `${window.location.origin}${endPoint}`,
    data,
  })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert(
          'success',
          'Your account information has been updated successfully',
          'body'
        );
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((e) => {
      showAlert('error', e.response.data.message, 'body');
      window.setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
};
