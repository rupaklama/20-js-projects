'use strict';

// DOM elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Functions

// display input error message
function showError(input, message) {
  // selecting parent element 'div' to override class name
  const formControl = input.parentElement;
  // to make input element border's red
  formControl.className = 'form-control error';

  // selecting 'small' element to display error message
  const displayErrorSmallTag = formControl.querySelector('small');
  displayErrorSmallTag.innerText = message;
}

// display success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// validate email
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Get field name
function getFieldName(input) {
  // return input.id.replace(input.id[0], input.id[0].toUpperCase());
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(inputArr) {
  // loop through an array to check each one
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check length of username
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than  ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // console.log(username.value);

  // passing all the input elements to validate input
  checkRequired([username, email, password, password2]);

  // note - reusable functions for all the input fields

  // verify length of user name
  // minimum length of 3 & max is 15
  checkLength(username, 3, 15);

  // verify length of user name
  // minimum length of 6 & max is 25
  checkLength(password, 6, 25);

  // email
  checkEmail(email);

  // passwords
  checkPasswordsMatch(password, password2);
});

// NOTE - This code is refactored above
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   // console.log(username.value);

//   if (username.value === '') {
//     // input element & message
//     showError(username, 'Username is required');
//   } else {
//     // input element
//     showSuccess(username);
//   }

//   if (email.value === '') {
//     // input element & message
//     showError(email, 'Email is required');
//   } else if (!isValidEmail(email.value)) {
//     showError(email, 'Email is not valid');
//   } else {
//     // input element
//     showSuccess(email);
//   }

//   if (password.value === '') {
//     // input element & message
//     showError(password, 'Password is required');
//   } else {
//     // input element
//     showSuccess(password);
//   }

//   if (password2.value === '') {
//     // input element & message
//     showError(password2, 'Password is required');
//   } else {
//     // input element
//     showSuccess(password2);
//   }
// });
