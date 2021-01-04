import { login, logout } from './auth';
import '@babel/polyfill';
import displayMap from './mapbox';
import formHandler from './genericFormHandler';
import updateSettings from './updateUser';
import { bookTour } from './stripe';

// ! auth
// login
const loginForm = document.querySelector('.form--login');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formHandler(['email', 'password'], login, '/api/v1/users/login');
  });
}
// logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
  });
}

// !Update user settings
const formUserData = document.querySelector('.form-user-data');
if (formUserData) {
  formUserData.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, '/api/v1/users/updateme');
  });
}
// updatePassword
// /api/v1/users/updateMyPassword
const formUserPassword = document.querySelector('.form-user-password');
if (formUserPassword) {
  formUserPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const loadingBtn = document.getElementById('save-pw-btn');
    loadingBtn.textContent = 'Saving...';
    formHandler(
      ['password', 'new_password', 'password-confirm'],
      updateSettings,
      '/api/v1/users/updateMyPassword'
    ).then((res) => {
      loadingBtn.textContent = 'Save Password';
    });
  });
}

// ! DISPLAY MAP
const mapBox = document.getElementById('map');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

// ! Handle Booking Tours
const bookTourBtn = document.getElementById('book-tour');

if (bookTourBtn) {
  bookTourBtn.addEventListener('click', async (e) => {
    e.target.textContent = 'Processing...';
    await bookTour(e.target.dataset.tourId);
    e.target.textContent = 'Book Tour Now';
  });
}
