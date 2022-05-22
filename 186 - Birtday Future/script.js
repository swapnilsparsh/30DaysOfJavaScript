//PURE JS
var monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysInMonth;
var userYearSelect = document.getElementById("userYear");
var userMonthSelect = document.getElementById("userMonth");
var userDaySelect = document.getElementById("userDay");
var yearSelected = "2017";
var monthSelected = "1";
var daySelected = "1";

userYearSelect.addEventListener("change", function() {
    yearSelected = userYearSelect.value;
    monthChange(); //update month (february) if leap year
});

function monthChange() {
      var daysInMonth = new Date(yearSelected, monthSelected, 0).getDate();
    userDaySelect.innerHTML = "";
    for (var i = 1; i <= daysInMonth; i++) {
        var el = document.createElement("option");
        el.textContent = i;
        el.value = i;
        userDaySelect.appendChild(el);
    };
}
userMonthSelect.addEventListener("change", function() {
    monthSelected = userMonthSelect.value;
    monthChange();
});

userDaySelect.addEventListener("change", function() {
    daySelected = userDaySelect.value;
});

for (var year = new Date().getFullYear(); year >= 1900; year--) {
    var el = document.createElement("option");
    el.textContent = year;
    el.value = year;
    userYearSelect.appendChild(el);
}

for (var i = 0; i < monthOptions.length; i++) {
    var el = document.createElement("option");
    el.textContent = monthOptions[i];
    el.value = i + 1;
    userMonthSelect.appendChild(el);
};

var checkDayButton = document.getElementById('checkDay');
checkDayButton.onclick = function(e) {
    e.preventDefault();
    var d = new Date(yearSelected + '-' + monthSelected + '-' + daySelected);
    day = d.getDay();

    function dayOfWeekAsString(day) {
        return [
            "<div class='dayName'>Sunday</div> <div class='dayDescription'><p>People who were born on Sundays have some of the most vibrant personality traits possible. These people tend to like their space when they have their alone time.</p><p>They also can get easily frustrated and leave things unfinished sometimes. Typically, are pretty sensitive and can sometimes dwell on what people say to you.</p><p>However, you have the brightest outlook on life, extremely positive, enjoy giving back to your community, and prefer to smile as often as you can.</p></div>",
            "<div class='dayName'>Monday</div><div class='dayDescription'><p>People who were born on a Monday have some of the most loving personality traits. You are family-oriented, very creative but like to keep those ideas to yourself, and tend to be a very sly negotiator when it comes to making sure that everyone is treated equally.</p><p>You are a person who strives for success and will assume the role of leadership if you have to.</p></div>",
            "<div class='dayName'>Tuesday</div><div class='dayDescription'><p>People who were born on the third day of the week, Tuesday, have some of the most successful traits to their personality. Although you are sensitive to criticism, you have high amounts of energy that drive you to meet your endgame goals sooner rather than later.</p><p>You are extremely successful in your career, speak as honestly as you possibly can, which can break peoples' hearts as you may know. You know right from wrong, and people can't help but be drawn to you.</p></div>",
            "<div class='dayName'>Wednesday</div><div class='dayDescription'><p>Those who claim Wednesdays as their day of birth have some of the most ideal traits to their personality.</p><p>You are very laid back, really love your work as well as the people you get to work with, are extremely universal when it comes to meeting different types of people, and you are an amazingly quick learner that makes you very good at your job.</p><p>However, you have a hard time staying organized sometimes. Otherwise, people love how relaxed you are.</p></div>",
            "<div class='dayName'>Thursday</div><div class='dayDescription'><p>People who were born on Thursdays have some of the most admirable personality traits. You are naturally charismatic as well as being a natural born leader.</p><p>You work very hard to meet your endgame goals, are mostly independent, extremely optimistic, and you give people your utmost respect when they deserve it. People are drawn to you for having such an adventurous lifestyle.</p></div>",
            "<div class='dayName'>Friday</div><div class='dayDescription'><p>Friday's children have some of the most creative personality traits. You tend to be one of the wisest people among your friends, are often told that you have a very old soul, extremely spiritual, and have an amazing sense of intuition.</p><p>However, you do not do well with setbacks and can obsess over disappointments that you've experienced in the past.</p></div>",
            "<div class='dayName'>Saturday</div><div class='dayDescription'><p>People who were born on a Saturday have some of these qualities to their personality: naturally, you are very confident but can sometimes present yourself as a snob to others.</p><p>You may also be somewhat negative to someone who asked for your opinion on something; you are very proud of your appearance and really love to take the time to look good. You are smart, trustworthy, and full of responsibility.</p></div>"
        ][day];
    }
    document.getElementById('result').innerHTML = 'You were born on: ' + dayOfWeekAsString(day);
}