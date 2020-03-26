/* eslint-disable */
//update data // call index.js
import { showAlert } from './alerts';
import axios from 'axios';

//type is either 'password or 'data'
export const updateUserData = async (data, type) => {
  console.log(data.name);
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      console.log(res.data);
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      /*window.setTimeout(() => {
        location.assign('/me');
      }, 1000);*/
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const changeUserPhoto = async data => {
  try {
    const url = 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      console.log(res.data);
      return { ...res };
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
