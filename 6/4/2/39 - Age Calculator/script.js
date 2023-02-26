/** Declare the required variable with DOM elements. */
const yearField = document.getElementById('year');
const monthField = document.getElementById('month');
const dayField = document.getElementById('day');
const calculateButton = document.getElementById('calculate-age');
const display = document.getElementById('display');
const today = new Date();

let selectedYear = today.getFullYear(),
	selectedMonth = today.getMonth() + 1,
	selectedDay = today.getDate(),
	daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


window.addEventListener('DOMContentLoaded', () => {
	updateDaysOfMonths(today.getFullYear());
	fillYearField();
	updateDayField(today.getFullYear(), today.getMonth() + 1);
	selectMonth(today.getMonth() + 1);
	selectDay(today.getDate());

	yearField.addEventListener('change', handleYearChange);
	monthField.addEventListener('change', handleMonthChange);
	dayField.addEventListener('change', handleDayChange);
	calculateButton.addEventListener('click', handleAgeCalculation);
});

/**
 * Check if a year is a leap year or not.
 *
 * @param {number} year
 * @returns boolean true if this is a leap year, false otherwise.
 */
function isLeapYear(year) {
	if (year % 400 === 0) return true;
	if (year % 100 === 0) return false;
	if (year % 4 === 0) return true;
	return false;
}

/**
 * Update the february month on year value change.
 * If the year is a leap year that means the february month
 * would be 29 days long, otherwise it's 28.
 *
 * @param {number} year
 */
function updateDaysOfMonths(year) {
	daysOfMonths[1] = isLeapYear(year) ? 29 : 28;
}

/**
 * Update the month field value.
 *
 * @param {number} month
 */
function selectMonth(month) {
	monthField.value = month;
}

/**
 * Update the day field value.
 *
 * @param {number} day
 */
function selectDay(day) {
	dayField.value = day;
}

/**
 * Fill the year field with the last 100 years.
 */
function fillYearField() {
	const numberOfYears = 100;
	const currentYear = today.getFullYear();
	const startYear = currentYear - numberOfYears;

	for (let i = startYear; i <= currentYear; i++) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;

		i === currentYear && option.setAttribute('selected', 'selected');
		yearField.appendChild(option);
	}
}

/**
 * Update the day field on change of year and month value.
 * This is needed to update the day field list with the change
 * of the month field as the months contain different value.
 * It is needed to change with year as the days change with leap year as well.
 *
 * @param {number} year
 * @param {number} month
 */
function updateDayField(year, month) {
	updateDaysOfMonths(year);
	const totalDays = daysOfMonths[month - 1];
	clearList(dayField);
	console.log({ selectedDay });

	for (let i = 1; i <= totalDays; i++) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;

		if (i === selectedDay) option.setAttribute('selected', 'selected');
		dayField.appendChild(option);
	}
}

/**
 * Clear a select element's options.
 *
 * @param {HTMLSelectElement} element
 */
function clearList(element) {
	for (let i = element.options.length - 1; i >= 1; i--) {
		element.remove(i);
	}
}

/**
 * Create a Date object with the selected year, month, day.
 *
 * @returns {Date}
 */
function makeDate() {
	return new Date(selectedYear, selectedMonth - 1, selectedDay);
}

/**
 * The yearn field's change handler function.
 *
 * @param {ChangeEvent} event
 */
function handleYearChange(event) {
	event.preventDefault();
	const { value } = event.target;
	selectedYear = +value;
	updateDayField(value, selectedMonth);
}


const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth,birthDate,birthYear;
    let birthDetails = {
        date:inputDate.getDate(),
        month:inputDate.getMonth()+1,
        year:inputDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if(
        birthDetails.year > currentYear ||
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ){
        alert("Not Born Yet");
        displayResult("-","-","-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
        birthMonth = currentMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if(currentDate >= birthDetails.date){
        birthDate = currentDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate,bMonth,bYear){
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}