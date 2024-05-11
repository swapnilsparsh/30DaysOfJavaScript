import { timeZonesList } from "./locale.js";

document.addEventListener('DOMContentLoaded', onPageLoad);
let dateContainer = document.querySelector('.show-date');
let timezone = '';
const comboBox = document.querySelector('#localelist');

function onPageLoad(){
    loadLocalesInComboBox();
    let selectedOption = comboBox.options[comboBox.selectedIndex];
    timezone = selectedOption.text;
    comboBox.addEventListener('change', handleComboBox);
    setInterval(displayLocalTime, 1000);
}

function handleComboBox(){
    let selectedOption = comboBox.options[comboBox.selectedIndex];
    timezone = selectedOption.text;
}

function displayLocalTime(){
    const date = new Date();
    dateContainer.innerHTML = date.toLocaleString('en-US', {timeZone:timezone, hour:'2-digit', minute:'2-digit', second:'2-digit'});
}

function loadLocalesInComboBox(){
    timeZonesList.sort();
    timeZonesList.forEach((locale) => {
        let newOption = new Option(locale.trim(), locale.trim());
        comboBox.add(newOption,undefined);
    })
}