function getPassword() {
    let length = document.getElementById('length').value;
    if (length === '' || isNaN(length)) {
        length = 8; // Setting default length to 8 if invalid input
    } else {
        length = parseInt(length); 
        if (length < 8 || length > 32) {
            length = 8; 
            alert('default 8 to 32')
        }
    }
    
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;

    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeSymbols) chars += '!@#$%&';
    if (includeNumbers) chars += '0123456789';

    if (chars === '') {
        alert('Please select at least one character type.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password').value = password;
}
