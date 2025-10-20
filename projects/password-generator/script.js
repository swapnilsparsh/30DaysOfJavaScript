const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const numbersCheckbox = document.getElementById("numbers");
const charsCheckbox = document.getElementById("chars");

function generatePassword() {
  let length = parseInt(lengthInput.value);
  let useNumbers = numbersCheckbox.checked;
  let useChars = charsCheckbox.checked;

  let str = "ABCDEFGHIGJKLMNOPQRSTWXYZabcdefghigjklmnopqrstwxyz";
  if (useNumbers) str += "0123456789";
  if (useChars) str += "!@#$%^&*-_+=[]{}~`";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += str.charAt(Math.floor(Math.random() * str.length));
  }

  passwordInput.value = password;
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
  generatePassword();
});

numbersCheckbox.addEventListener("change", generatePassword);
charsCheckbox.addEventListener("change", generatePassword);

copyBtn.addEventListener("click", () => {
  passwordInput.select();
  passwordInput.setSelectionRange(0, lengthInput.value);
  navigator.clipboard.writeText(passwordInput.value);
  alert("Password copied to clipboard!");
});

// Generate initial password
generatePassword();
