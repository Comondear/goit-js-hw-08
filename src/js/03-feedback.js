import LodashThrottle from 'lodash.throttle';

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const feedback = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea')

feedback.addEventListener('input', LodashThrottle(onFormInput, 500));
feedback.addEventListener('submit', onFormSubmit);
input.addEventListener('input', onFormInput);
textarea.addEventListener('input', onFormInput);

const STORAGE_KEY = 'feedback-form-state';

initPage();

function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}

function onFormInput(e) {
  const { name, value } = e.target;
  let formData = load(STORAGE_KEY);
  formData = formData ? formData : {};
  formData[name] = value;
  save(STORAGE_KEY, formData);
}

function initPage() {
  const parseData = load(STORAGE_KEY);
  if (parseData) {
    const savedData = Object.entries(parseData);
    savedData.forEach(([name, value]) => {
      feedback.elements[name].value = value;
    });
  }
}
///////////////////////////////////////////////////////////////////
// import LodashThrottle from 'lodash.throttle';

// const feedback = document.querySelector('.feedback-form');
// const input = document.querySelectorAll('.feedback-form label');
// const textarea = document.querySelector('.feedback-form textarea');

// feedback.addEventListener('input', LodashThrottle(onFormInput, 500));
// feedback.addEventListener('submit', onFormSubmit);
// input.addEventListener('input', onFormInput);
// textarea.addEventListener('input', onFormInput);

// const STORAGE_KEY = 'feedback-form-state';

// initPage();

// function onFormSubmit(e) {
//   e.preventDefault();
//   localStorage.removeItem('feedback-form-state');
//   e.currentTarget.reset();
// }

// function onFormInput(e) {
//   const email = e.target.value;
//   const message = e.target.value;

//   console.log(email);
//   console.log(message);
//   localStorage.setItem(STORAGE_KEY, email);
//   localStorage.setItem(STORAGE_KEY, message);

// }

// function initPage() {
//   const saveEmail = localStorage.getItem(STORAGE_KEY);
//   const saveMessage = localStorage.getItem(STORAGE_KEY);

//   if (getData) {
//     email.value = getData.email || '';
//     message.value = getData.message || '';
//   } 
//   // if (saveMessage, saveEmail) {
//   //   input.value = saveEmail;
//   //   textarea.value = saveMessage;
//   // }
// }
////////////////////////////////////////////////////////////////////

// import LodashThrottle from 'lodash.throttle';

// const feedback = document.querySelector('.feedback-form');
// const input = document.querySelectorAll('.feedback-form label');

// feedback.addEventListener('input', LodashThrottle(onFormInput, 500));
// feedback.addEventListener('submit', onFormSubmit);
// feedback.addEventListener('input', onFormInput);

// initPage();

// function onFormSubmit(e) {
//   e.preventDefault();
//   localStorage.removeItem('feedback-form-state');
//   e.currentTarget.reset();
// }

// function onFormInput(e) {
//   const message = e.target.value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(message));
// }

// function initPage() {
//   const saveMessage = localStorage.getItem('feedback-form-state');
//   const parsedMessage = JSON.parse(saveMessage);
//   if (saveMessage) {
//     input.value = saveMessage;
//   }
// }







