// variables to store html elements

let langOption = document.querySelectorAll("select");

let inputText = document.getElementById("inputText");

let outputText = document.getElementById("translatedText");

let inputVoice = document.querySelector(".inputSpeech");

let outputVoice = document.querySelector(".outputSpeech");

let clipboard = document.querySelector(".bx-copy");

let exchange = document.querySelector(".bx-transfer");

let inputLength = document.querySelector(".input_length");

// using foreach loop to iterate through the list while providing callback function as parameter
langOption.forEach((get, con) => {
  for (countryCode in language) {
    let selected;
    // check if the countryCode is english
    if (con == 0 && countryCode == "en-GB") {
      selected = "selected";

      // check if the countryCode is japanese
    } else if (con == 1 && countryCode == "ja-JP") {
      selected = "selected";
    }

    // inserting option with values of country code to the dropdown
    let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
    get.insertAdjacentHTML("beforeend", option);
  }
});

// adding click event listner to the input textarea
inputText.addEventListener("input", () => {
  let content = inputText.value;
  userInput = langOption[0].value;
  Output = langOption[1].value;

  // storing api link to a variable
  const apiLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${userInput}|${Output}`;

  // processing the api data
  fetch(apiLink)
    .then((translate) => translate.json())
    .then((data) => (outputText.value = data.responseData.translatedText));
});

// adding click event listener to the input voice button
inputVoice.addEventListener("click", () => {
  let inputTextSpeech = new SpeechSynthesisUtterance(inputText.value);
  inputTextSpeech.lang = langOption[0].value;
  speechSynthesis.speak(inputTextSpeech);
});

// adding click event listener to the output voice button
outputVoice.addEventListener("click", () => {
  let outputTextSpeech = new SpeechSynthesisUtterance(outputText.value);
  outputTextSpeech.lang = langOption[1].value;
  speechSynthesis.speak(outputTextSpeech);
});

// stopping the speech when page is reloaded
window.onbeforeunload = function () {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
};

// adding click event listener to the copy button
clipboard.addEventListener("click", () => {
  if (outputText.value) {
    // storing the copied value to clipboard
    navigator.clipboard
      .writeText(outputText.value)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text: " + error);
      });
  }
});

// adding click event listener to the exchange button
exchange.addEventListener("click", () => {
  let temp = langOption[0].value;
  langOption[0].value = langOption[1].value;
  langOption[1].value = temp;

  let temp1 = inputText.value;
  inputText.value = outputText.value;
  outputText.value = temp1;
});

// adding keyup event listener to count the number of characters
inputText.addEventListener("keyup", () => {
  inputLength.innerHTML = `${inputText.value.length}/499`;
});
