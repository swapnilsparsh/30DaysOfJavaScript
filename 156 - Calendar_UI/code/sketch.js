var h2 = document.querySelector(".calendar-picture h2");
var h3 = document.querySelector(".calendar-picture h3");
var monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var dayArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var day31MonthArr = [
  "January",
  "March",
  "May",
  "July",
  "August",
  "October",
  "December",
];
var d = new Date();
var obj = getDate();

function getDate() {
  var month = d.getMonth();
  month = monthArr[month];
  var day = d.getDay();
  day = dayArr[day];
  var date = d.getDate();
  h2.innerHTML = date + ", " + day;
  h3.innerHTML = month;
  return { m: month, dy: day, dt: date, yr: d.getFullYear() };
}
function generateCalendar() {
  var days;
  if (obj.m === "February" && obj.yr % 4 !== 0) {
    days = 28;
  } else if (obj.m === "February" && obj.yr % 4 === 0) {
    days = 29;
  } else if (day31MonthArr.includes(obj.m)) {
    days = 30;
  }
  var LocalDatArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  var startOfMonth = moment().clone().startOf("month").format("dddd");
  var dayIndex = LocalDatArr.indexOf(startOfMonth);
  for (var j = 0; j < dayIndex; j++) {
    var element = document.createElement("div");
    element.className = "calendar_number_empty";
    document.getElementById("lc").appendChild(element);
  }
  for (var k = 1; k <= days; k++) {
    var element = document.createElement("div");
    obj.dt === k
      ? (element.className = "calendar_number calendar_number--current")
      : (element.className = "calendar_number");
    element.appendChild(document.createTextNode(k));
    document.getElementById("lc").appendChild(element);
  }
}
generateCalendar();
