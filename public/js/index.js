/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateUserData } from './updateSettings';
import { changeUserPhoto } from './updateSettings';
import { bookTour } from './stripe';

//DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.getElementById('logout');
const updateForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');
//DELEGATION

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);

  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (updateForm) {
  const form = new FormData();

  document
    .querySelector('.form__upload')
    .addEventListener('change', async e => {
      e.preventDefault();

      form.append('photo', document.getElementById('photo').files[0]);
      const resObj = await changeUserPhoto(form);

      if (resObj.data.status === 'success') {
        document.querySelector(
          '.form__user-photo'
        ).src = `/img/users/${resObj.data.data.user.photo}`;
      }
      window.location.reload();
    });

  updateForm.addEventListener('submit', e => {
    const newForm = new FormData();
    e.preventDefault();
    newForm.append('name', document.getElementById('name').value);
    newForm.append('email', document.getElementById('email').value);
    updateUserData(newForm, 'data');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').innerHTML = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateUserData(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').innerHTML = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
