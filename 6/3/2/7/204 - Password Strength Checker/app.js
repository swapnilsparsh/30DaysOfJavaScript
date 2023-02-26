let input = document.getElementById('password')
let indicator = document.querySelector('.indication')
let weak = document.querySelector('.weak')
let medium = document.querySelector('.medium')
let strong = document.querySelector('.strong')
let indicationText = document.querySelector('.indicationText')
let showBtn = document.querySelector('.password-show-btn')
let hideBtn = document.querySelector('.password-hide-btn')

// RegEx
let regExWeak = /[a-zA-Z]/
let regExMedium = /\d+/
let regExStrong = /.[!,@,#,$,%,^,&,*,_,-,+,~,(,)]/

// Default indication text
indicationText.innerText = "Enter the Password"

// Trigger for input onkeyup
function trigger() {
    if (input.value !== "") {
        indicator.style.display = "block"
        indicator.style.display = "flex"
        showBtn.style.display = "block"

        // As the Password Getting Stronger
        // Weak
        if (regExWeak.exec(input.value) || regExStrong.exec(input.value) || regExMedium.exec(input.value) && input.value.length > 8) {
            weak.style.backgroundColor = "red"
            indicationText.innerText = "Password is too Weak"
        }
        else {
            weak.style.backgroundColor = "lightgrey"
        }

        // Medium
        if ((regExMedium.exec(input.value) && regExWeak.exec(input.value)) || (regExMedium.exec(input.value) && regExStrong.exec(input.value)) || (regExWeak.exec(input.value) && regExStrong.exec(input.value)) && input.value.length > 10) {
            medium.style.backgroundColor = "rgb(255, 166, 0)"
            indicationText.innerText = "Password is Medium"
        }
        else {
            medium.style.backgroundColor = "lightgrey"
        }

        // Strong
        if (regExStrong.exec(input.value) && regExMedium.exec(input.value) && regExWeak.exec(input.value) && input.value.length > 12) {
            strong.style.backgroundColor = "rgb(39, 233, 0)"
            indicationText.innerText = "Password is Strong"
        }
        else {
            strong.style.backgroundColor = "lightgrey"
        }
    }
    else {
        indicator.style.display = "none"
        showBtn.style.display = "none"
        hideBtn.style.display = "none"
        indicationText.innerText = "Enter the Password"
    }
}

// To show text of password
function showPassword() {
    input.type = "text"
    showBtn.style.display = "none"
    hideBtn.style.display = "block"
}

// To Again hide text of password
function hidePassword() {
    input.type = "password"
    hideBtn.style.display = "none"
    showBtn.style.display = "block"
}