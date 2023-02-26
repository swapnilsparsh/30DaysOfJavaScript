var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var callNumber;
var telLink = "tel:"
var soundBars = 3;
var maxSoundBars = 10;
var minSoundBars = 1;

function startDate() {
  var today = new Date();
  
  var thisWeek = days[ today.getDay() ];
  var thisDay = today.getDay();
  var thisMonth = months[ today.getMonth() ];
  
  document.getElementsByClassName("date")[0].innerHTML = thisWeek + ", " + thisMonth + " " + thisDay;
}

function startTime() {
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    minute = checkTime(minute);
    document.getElementsByClassName("clock")[0].innerHTML = hour + ":" + minute;
    document.getElementsByClassName("time")[0].innerHTML = hour + ":" + minute;
    var time = setTimeout(startTime, 60000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

$(".key").click(function(){
  
  callNumber =  $(".dialer").html() ;
  
  if(callNumber.length < 12) {
    callNumber += $(this).html()
    $(".dialer").text(callNumber);
    $(".callButton").attr("href", telLink + callNumber);
  }
  
});

$(".power").click(function(){
  $(".phone-container").toggleClass("is-locked");
});

$(".mute").click(function(){
  
  $(".phone-container").toggleClass("is-muted");
  
  showOverlay();
});

$(".volume.up").click(function(){
  
  if( soundBars < maxSoundBars ) {
    soundBars += 1;
    drawSoundBars();
  }
  showOverlay();
  
});

$(".volume.down").click(function(){
  
  if( soundBars > minSoundBars ) {
    soundBars -= 1;
    drawSoundBars();
  }
  showOverlay();
  
});

function showOverlay() {
  
  //$(".phone-container").toggleClass("show-mute-overlay");
  
  if($(".phone-container").hasClass("show-mute-overlay")) {
    setTimeout(function(){
      $(".phone-container").removeClass("show-mute-overlay");
    }, 2000);
  } else {
    $(".phone-container").addClass("show-mute-overlay");
    setTimeout(function(){
      $(".phone-container").removeClass("show-mute-overlay");
    }, 2000);
  }
  
}

function drawSoundBars(){
  $(".sound-bar").empty();
  for(var i = 0; i < soundBars; i++) {
    $(".sound-bar").append("<div class='bar'></div>");
  }
}

startTime();
startDate();
drawSoundBars();