let mainTl = new TimelineMax();

var masterTl = new TimelineMax({paused: true});

function createFruit() {
  $('.party-popper-container').append(new Array(50).join('<span class="particle" />'));
  masterTl.add(animateFruit());
  eventHandlers();
}
 function eventHandlers() {
   $('.click').click(function() {
     masterTl.play(0);
   });
 }

function animateFruit() {
  var parentHeight = $('.container').height();
  var parentWidth = $('.container').width();
  var mainTl = new TimelineMax();
   $('.particle').each(function(i, particle) {
  var tl = new TimelineMax()
  .to(particle, random(0.7, 1.2), {x: random(-parentWidth, parentWidth), y: random(-parentHeight / 1.5, -parentHeight * 2 ), rotation: random(-360, 360), ease: Power3.easeOut}, random(0, 0.5))
  .to(particle, random(3,4), {y: parentHeight*2, rotation: '+=180', ease: Power2.easeInOut}, random(1, 1.5))
     mainTl.add(tl,0);
  });

  return mainTl;

}
function random(min, max){ return min + ( Math.random() * (max - min)) };

$(function() {
  createFruit();
});