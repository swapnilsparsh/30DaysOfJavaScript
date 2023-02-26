// Constants
const ACTIVE_TIME_MS = 5000;
const DEACTIVATION_TIME_MS = 750;

// Variables
var felix = document.getElementById("felix");
var responseFrame = document.getElementById("response-frame");
var responseMessage = document.getElementById("response-message");
var userMadeDecision = false;
var jokes = [
	'I ate a clock yesterday, it was very time-consuming.',
	'A perfectionist walked into a bar…apparently, the bar wasn’t set high enough.',
	'Employee of the month is a good example of how somebody can be both a winner and a loser at the same time.',
	'I don’t have a girlfriend, but I know a girl that would get really mad if she heard me say that.',
	'Relationships are great, but have you ever had stuffed crust pizza?',
	'The worst time to have a heart attack is during a game of charades.',
	'My therapist says I have a preoccupation with vengeance. We’ll see about that.',
	'I have a friend. He keeps trying to convince me he’s a compulsive liar, but I don’t believe him.'
];

// Activate felix and set timeout for awaiting a command.
function activateFelix() {
	userMadeDecision = false;
	felix.classList.remove("inactive");
	felix.classList.add("active");
	setTimeout(function() {
		if (!userMadeDecision) {
			felix.classList.remove("active");
			felix.classList.add("inactive");
			setTimeout(function() {
				felix.classList.remove("inactive");
			}, 750);
		}
	}, 5000);
}
function deactivateFelix() {
	userMadeDecision = true;
	felix.classList.remove("active");
	felix.classList.add("inactive");
	setTimeout(function() {
		felix.classList.remove("inactive");
	}, 750);
}
function getWeather() {
	responseMessage.innerText = "The weather really just kind of sucks here, and I know you wanted the weather at your location, but that's life for you.";
	showResponse();
}
function getTime() {
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes();
	responseMessage.innerText = "Perhaps it's time for you to get a watch? I'm just kidding... No. Really... It's " + time + ".";
	showResponse();
}
function getDate() {
	var today = new Date();
	var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
	responseMessage.innerText = "A calendar is a great investment you know; I mean, your computer even has one! Since you asked, today is " + date + ".";
	showResponse();
}
function tellJoke() {
	var index = Math.floor((Math.random() * jokes.length) - 1);
	responseMessage.innerText = jokes[index];
	showResponse();
}
function searchGoogle() {
	deactivateFelix();
	window.open("https://www.google.com/", "_blank");
}
function showInspiration() {
	deactivateFelix();
	window.open("https://dribbble.com/shots/5473987-AI-Robot", "_blank");
}
function showResponse() {
	responseFrame.classList.add("active");
	deactivateFelix();
}
function closeResponse() { responseFrame.classList.remove("active"); }
changeTheme(SiteTheme.Dark);