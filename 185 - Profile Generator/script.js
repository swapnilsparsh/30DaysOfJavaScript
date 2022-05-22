var button = $(".button");
var container = $(".container");
var gender = ["male","female"];
var skins = [
  "ginger",
  "lighter",
  "light",
  "latino",
  "dark",
  "darker"
];
var hairs = [
  "gray",
  "black",
  "orange",
  "yellow",
  "brown"
];

var parts = [
  ".torso",
  ".neck",
  ".face-",
  ".ears-",
  ".hair-",
  ".hair-back-",
  ".beard-",
];

var faces = [1,2,3];
var maleHair = [1,2,3,4,5,6,7];
var femaleHair = [8,9,10,11];
var hairBack = [
  "short",
  "medium",
  "large"
];

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reset() {
  $('.torso, .neck, .face-1, .face-2, .face-3, .ears-1, .ears-2').removeClass('ginger light lighter latino dark darker').css("opacity","0");
  $('.ears-1, .ears-2').removeClass('earGinger earLight earLighter earLatino earDark earDarker').css("opacity","0");
  $('.hair-1, .hair-2, .hair-3, .hair-4, .hair-5, .hair-6, .hair-7, .hair-8, .hair-9, .hair-10, .hair-11, .hair-back-short, .hair-back-medium, .hair-back-large, .beard-1, .beard-2').removeClass('gray black orange yellow brown').css("opacity","0");
}

function generate(){
  
  var sex = getRandom(0, gender.length - 1);
  var skin = getRandom(0, skins.length - 1);
  var hairColor = getRandom(0, hairs.length - 1);
  var face = getRandom(0, faces.length - 1);
  var back = getRandom(0, hairBack.length - 1);
 
  var control = {
    'torso'     : skins[skin],
    'neck'      : skins[skin],
    'ear'       : 'ear' + capitalizeFirstLetter(skins[skin]),
    'face'      : faces[face],
    'faceColor' : skins[skin],
    'hair'      : hairs[hairColor],
    'hairBack'  : hairBack[back],
  };
  
  //face
  $(parts[0]).addClass(control.torso).css("opacity","1");
  $(parts[1]).addClass(control.neck).css("opacity","1");
  $(parts[2] + control.face.toString()).addClass(control.faceColor).css("opacity","1");
  $(parts[3] + '1').addClass(control.ear).css("opacity","1");
  $(parts[3] + '2').addClass(control.ear).css("opacity","1");
 
  //hair
  if(sex == 0) {
    var str = "";
    var type = 0;
    type = getRandom(0, maleHair.length - 1);
    str = maleHair[type].toString();
    $(parts[4] + str).addClass(control.hair).css("opacity","1");
    $(parts[6] + back.toString()).addClass(control.hair).css("opacity", "1");
    console.log(parts[7] + back.toString());
  } else if(sex == 1){
    var str = "";
    var type = 0;
    type = getRandom(0, femaleHair.length - 1);
    str = femaleHair[type].toString();
    $(parts[4] + str).addClass(control.hair).css("opacity", "1");
    $(parts[5] + control.hairBack).addClass(control.hair).css("opacity", "1");
  }
};

function resetBlur() {
  var resetFilter = 'blur(0px)';
   $('.container')
    .css('filter',resetFilter)
    .css('webkitFilter',resetFilter)
    .css('mozFilter',resetFilter)
    .css('oFilter',resetFilter)
    .css('msFilter',resetFilter);
};

function blurFunction(){
  var filterVal = 'blur(10px)';
   $('.container')
    .css('filter',filterVal)
    .css('webkitFilter',filterVal)
    .css('mozFilter',filterVal)
    .css('oFilter',filterVal)
    .css('msFilter',filterVal);
};
generate();
button.on("click",function(){
  reset();
  blurFunction();
  setTimeout(resetBlur,200);
  generate();
});