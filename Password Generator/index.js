const formEl = document.querySelector('.form');
const generatePwdsBtn = document.querySelector('.generate-pwd-btn');
const clearPwdBtn= document.querySelector('.clear-pwd-btn');
const passwordBoxesMainEl = document.querySelector('.password-boxes');
const allPasswordBoxes = document.querySelectorAll('.box');
const userInput = document.getElementById('user-input');
const instructionsText = document.querySelector('.instructions-text')
const notificationText = document.querySelector('.notification-text');

const chars = String.fromCharCode(...Array(123).keys()).slice(33); 


generatePwdsBtn.addEventListener('click', generatePasswords);
clearPwdBtn.addEventListener('click', clearPwd);
passwordBoxesMainEl.addEventListener('click', copyToClipboard);



formEl.addEventListener('submit', (e) => {
  e.preventDefault();
});


userInput.addEventListener('click', () => {
  if (instructionsText.style.color === 'red') {
    instructionsText.style.color = 'white';
  }
});



function generatePasswords() {
  const lengthOfPassword = checkUserInput(+userInput.value);

  if (lengthOfPassword) {
    const randomPasswords = generatePwd(lengthOfPassword);
    fillPwdBox(randomPasswords)
  }
}


function checkUserInput(len) {
  if (len >= 10 && len <= 20) {
    return len;
  } 
  instructionsText.style.color = 'red';
}


function generatePwd(num) {
  let password = '';
  let arrayOfPasswords = [];

  for (let i = 0; i < 4; i++) {
    password = '';

    for (let j = 0; j < num; j++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    arrayOfPasswords.push(password);
  }
  return arrayOfPasswords;
}


function fillPwdBox(pwrds) {
  for (let i = 0; i < allPasswordBoxes.length; i++) {
    allPasswordBoxes[i].textContent = pwrds[i];
  }
}


function copyToClipboard(e) {
  if (e.target.tagName === 'BUTTON') {
    const textToCopy = e.target.textContent;
    navigator.clipboard.writeText(textToCopy)
    .then( () => {
      notifyUser();
    })
    .catch(err => {
      alert('Something went wrong', err);
    });
  }
}



function notifyUser() {
  notificationText.classList.add('copied');
  let temp = setInterval( () => {
    notificationText.classList.remove('copied');
    clearInterval(temp);
  }, 1000);
}


function clearPwd() {
  allPasswordBoxes.forEach((item) => {
    item.innerHTML = '<i class="fa-solid fa-ellipsis three-dots-icon"></i>';
  });
}
