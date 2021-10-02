let input = document.getElementById("input_number");
let output = document.getElementById("output_number");
let select = document.getElementById("select");
var into = document.getElementById("into");


function changeinto(){
    into.innerHTML = select.value;
}
changeinto();
function calculate() {
  let number = input.value;
  if (isNaN(number) || number == "") {
    alert("given value is not a number");
    output.value = "";
  }
  if (select.value == "Binary") {
    if (number == 0) {
      output.value = 0;
    } else {
      let response = "";
      while (number > 0) {
        response = (number % 2) + response;
        number = Math.floor(number / 2);
      }
      output.value = response;
    }
  } else if (select.value == "Hexadecimal") {
    if (number == 0) {
      output.value = 0;
    } else {
      let hexa = [];
      let r,
        t,
        i,
        j = 0;
      t = number;
      while (t > 0) {
        r = t % 16;
        if (r < 10) {
          hexa[j++] = 48 + r;
        } else {
          hexa[j++] = 55 + r;
        }
        t = parseInt(t / 16);
      }
      let char = "";
      for (i = j - 1; i >= 0; i--) {
        char += String.fromCharCode(hexa[i]);
      }
      output.value = char;
    }
  } else if (select.value == "Octal") {
    if (number == 0) {
      output.value = 0;
    } else {
      let r,
        t,
        i = 1,
        j = 0;
      t = number;
      while (t != 0) {
        r = t % 8;
        j += i * r;
        i = i * 10;
        t = parseInt(t / 8);
      }
      output.value = j;
    }
  }
}
