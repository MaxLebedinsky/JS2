'use strict';
const regExpName = /^[a-zа-яё]+$/i;
const regExpTel = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
const regExpEmail = /^[a-z-\.\d]+@[a-z]+\.[a-z]+$/i;

const inputName = document.querySelector('.input-name');
const inputTel = document.querySelector('.input-tel');
const inputEmail = document.querySelector('.input-email');

const button = document.querySelector('.btn-submit');
const message = document.querySelector('.form-message');
let error;

function checkField(target, regExp) {
    let result = target.value.match(regExp);
    if (result === null) {
        target.classList.add('red-border');
        error = true;
    } else {
        target.classList.remove('red-border');
    };
}

button.onclick = () => { 
    error  = false;
    checkField(inputName, regExpName);
    checkField(inputTel, regExpTel);
    checkField(inputEmail, regExpEmail);

    if (error) {
        message.innerText = 'Есть ошибки!';
    } else {
        message.innerText = 'Данные успешно отправлены.';
    };
    return false;
}