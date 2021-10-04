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

/** Listen the event DOMContentLoaded. */
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

/**
 * The month field's change handler function.
 *
 * @param {ChangeEvent} event
 */
function handleMonthChange(event) {
	event.preventDefault();
	const { value } = event.target;
	selectedMonth = +value;
	updateDayField(selectedYear, value);
}

/**
 * The day field's change handler function.
 *
 * @param {ChangeEvent} event
 */
function handleDayChange(event) {
	event.preventDefault();
	const { value } = event.target;
	selectedDay = +value;
}

/**
 * Calculate the age.
 *
 * @param {ClickEvent} event
 * @returns void
 */
function handleAgeCalculation(event) {
	event.preventDefault();
	const dob = moment(makeDate());
	const current = moment(today);

	if (dob.isAfter(current)) {
		displayAge('Invalid Date of Birth! You cannot be born after today!');
		return;
	}
	const diff = moment.preciseDiff(current, dob, true);

	displayAge(createAgeString(diff));
}

/**
 * Create a age string from the preciseDiff object
 *
 * @param {object} diffObject
 * @returns {string}
 */
function createAgeString(diffObject) {
	const { years, months, days } = diffObject;

	if (years === 0 && months === 0 && days === 0) {
		return "You've just born today!";
	}

	let ageStr = 'You are';

	if (years > 0) {
		ageStr += ` <code>${years} ${years > 1 ? 'years' : 'year'}</code>`;
	}

	if (months > 0) {
		ageStr += ` <code>${months} ${months > 1 ? 'months' : 'month'}</code>`;
	}

	if (days > 0) {
		ageStr += ` <code>${days} ${days > 1 ? 'days' : 'day'}</code>`;
	}

	return ageStr + ' old!';
}

/**
 * Display the age message to the display.
 *
 * @param {string} message
 */
function displayAge(message) {
	display.innerHTML = message;
}
