// script.js
document.getElementById('generateOtp').addEventListener('click', generateOtp);
document.getElementById('toggleMode').addEventListener('click', toggleMode);

function generateOtp() {
    const otpType = document.querySelector('input[name="otpType"]:checked').value;
    const otpLength = 6; // Set the length of the OTP
    let otp = '';

    if (otpType === 'numeric') {
        otp = generateNumericOtp(otpLength);
    } else if (otpType === 'alphanumeric') {
        otp = generateAlphanumericOtp(otpLength);
    }

    document.getElementById('otp').value = otp;
}

function generateNumericOtp(length) {
    let otp = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}

function generateAlphanumericOtp(length) {
    let otp = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.getElementById('otp').classList.toggle('dark-mode');
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle('dark-mode');
    });
    
   // script.js
document.getElementById('generateOtp').addEventListener('click', generateOtp);
document.getElementById('toggleMode').addEventListener('click', toggleMode);

function generateOtp() {
    const otpType = document.querySelector('input[name="otpType"]:checked').value;
    const otpLength = parseInt(document.getElementById('otpLength').value);
    let otp = '';

    if (otpType === 'numeric') {
        otp = generateNumericOtp(otpLength);
    } else if (otpType === 'alphanumeric') {
        otp = generateAlphanumericOtp(otpLength);
    }

    document.getElementById('otp').value = otp;
}

function generateNumericOtp(length) {
    let otp = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}

function generateAlphanumericOtp(length) {
    let otp = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.getElementById('otp').classList.toggle('dark-mode');
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle('dark-mode');
    });
    
    // Toggle the icon
    const modeIcon = document.getElementById('modeIcon');
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
}

// Initialize with light mode
document.body.classList.add('light-mode');
document.querySelector('.container').classList.add('light-mode');
document.getElementById('otp').classList.add('light-mode');
document.querySelectorAll('button').forEach(button => {
    button.classList.add('light-mode');
});

    const modeIcon = document.getElementById('modeIcon');
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
}


document.body.classList.add('light-mode');
document.querySelector('.container').classList.add('light-mode');
document.getElementById('otp').classList.add('light-mode');
document.querySelectorAll('button').forEach(button => {
    button.classList.add('light-mode');
});
