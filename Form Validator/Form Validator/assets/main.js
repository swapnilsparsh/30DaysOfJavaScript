const form = document.querySelector(".signup-form");
const usernamePattern = /^[a-zA-Z]{6,12}$/;
// feedbackSelection

const usernameFeedback = document.querySelector('.usernamefeedback');
const emailFeedback = document.querySelector(".emailfeedback");
const passwordFeedback = document.querySelector(".passwordfeedback");

const confirmPasswordFeedback = document.querySelector(".confpasswordfeedback");

const emailPattern =
  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;

form.username.addEventListener('keyup', e => {
    if(usernamePattern.test(e.target.value)){
        form.username.setAttribute("class", "success");
    }else {
        form.username.setAttribute("class", "failed");
    }
});

form.password.addEventListener('keyup', e => {
    if(passwordPattern.test(e.target.value)){
        form.password.setAttribute("class", 'success');
    }else{
        form.password.setAttribute("class", "failed")
    }
});

form.email.addEventListener('keyup', e => {
    if(emailPattern.test(e.target.value)){
        form.email.setAttribute("class", "success");
    }else{
        form.email.setAttribute("class", "failed");

    }
});

form.repassword.addEventListener('keyup', e => {
    if(form.password){
        form.repassword.setAttribute("class", 'success');
    }else {
        form.repassword.setAttribute("class", "failed");
    }
});

// form validation.

form.addEventListener('submit', e => {
    e.preventDefault();
    if(usernamePattern.test(e.target.value)){
        usernameFeedback.textContent = 'that username is vaild!';
    }else{
        usernameFeedback.textContent = "username must be in between 6 to 12 char long";
    }
    if(emailPattern.test(e.target.value)){
        emailFeedback.textContent = "email is valid!";
    }else{
        emailFeedback.textContent = "email must contain .com";
    }
    if(passwordPattern.test(e.target.value)){
        passwordFeedback.textContent = "password is valid";
    }else{
        passwordFeedback.textContent =
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    }
})
