const BASE_URL ="https://v6.exchangerate-api.com/v6/16947c81da979880bacde4f5/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector("#fromselect");
const toCurr = document.querySelector("#toselect");
const msg = document.querySelector("#msgg");
const swap_curr = document.querySelector(".swap");

let amount = document.querySelector("#frominput");
let displayamt = document.querySelector("#toinput");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

function swap() {
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
  convert();
}

const convert = async () => {
  const URL = `${BASE_URL}/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rates[toCurr.value];
  displayamt.value = (amount.value * rate).toFixed(4);
  msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


swap_curr.addEventListener("click", swap);
amount.addEventListener("input", convert);
fromCurr.addEventListener("change", convert);
displayamt.addEventListener("input", convert);
toCurr.addEventListener("change", convert);


window.addEventListener("load", () => {
  convert();
});