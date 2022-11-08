import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textRef = document.querySelector('textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';
const localStorageFormData = JSON.parse(
  window.localStorage.getItem(LOCALSTORAGE_KEY)
);

let formData = localStorageFormData ? { ...localStorageFormData } : {};
console.log(formData);

if (localStorageFormData) {
  const { email = '', message = '' } = localStorageFormData;
  inputRef.value = email;
  textRef.value = message;
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(formData);
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
}

formRef.addEventListener('input', throttle(onFormInput, 500));

formRef.addEventListener('submit', onFormSubmit);
