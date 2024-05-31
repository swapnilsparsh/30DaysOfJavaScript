/*
    @ cm = computer player
    @ us = User Player
    @ Cannon =  can
*/
let userCanX = 185; 
let userCanY = 0; 
let fireTime = 13000;
let countdown = (fireTime /1000)-3;
let hitAudio = new Audio('http://soundbible.com/mp3/Sniper_Rifle-Kibblesbob-2053709564.mp3');
let fireAudio = new Audio('http://soundbible.com/mp3/Super%20Punch%20MMA-SoundBible.com-1869306362.mp3');

// counter 
setInterval( ()=> {
  countdown = countdown > 0? countdown : 0;
  $('.countdown').text(countdown-- );
},1000)



setInterval( ()=> {
  let cmCanPipe = $('.cm .pipe');
  let allPipe = $('.pipe');
  let cmCan = $('.cannon.cm');
  let canBall = $('.ball');
  let cmCanAngle =  Math.floor(Math.random() * 45);
  let cmCanX =  Math.floor(Math.random() * 8) + 2 ; // 2 to 10
  let ballMileage =   (cmCanX + 4.23) / Math.cos((cmCanAngle * (Math.PI/180) ));
  countdown = (fireTime /1000)-3;
  // Set computer Cannon pipe Angle
  cmCanPipe.css({
    transform: 'rotate(' + cmCanAngle + 'deg)'
  });
  // Set computer Cannon Position
  cmCan.css({
    transform: 'translateX(' + cmCanX + 'cm)'
  });
  // computer Cannon wheel rotation on move
  $('.cm .wheel').css({
    transform: 'rotate(' + ( cmCanX ) + 'deg)'
  })
  
  
  $('.level-monitor').text(cmCanAngle);
  //   Reset Values
  canBall.css('left' , 0);
  allPipe.removeClass('fire');
  $('.game-container').removeClass('defended');
  $('.level').width((ballMileage  ) + 'cm' )
  
  // Fire on  timeout  
  setTimeout( ()=> {
    let comCanX =  cmCanX * 37.79; // convert cm to px
    let validX = (userCanX - 5) <= comCanX && (userCanX + 5) >= comCanX ? true : false;
    let validAngle = (userCanY - 2) <= cmCanAngle && (userCanY + 2) >= cmCanAngle ? true : false;
    fireAudio.play(); // sound effect for fire
    allPipe.addClass('fire'); // Cannon pipe Animation
    
    // Check User Cannon and Computer cannon are same position and angle
    if( validAngle && validX ){  
      $('.game-container').addClass('defended');
      canBall.animate({
         left :  (-ballMileage + 4.23) + 'cm',
       },500 , ()=> {
        hitAudio.play(); // sound effect for hit
        });
    } else{
      canBall.animate({
          left : '-100vw',
      },1000)
    };
  }, (fireTime - 2000));
}, fireTime );

// User Cannon Move X
$('.wheel-handle').mousedown((e)=>{
  const clickX = e.pageX;
  let canX  = 0;
  $(this).mousemove((e)=>{
    let canDX = ( e.pageX - clickX ) + userCanX;    
    canX  = canDX < 375 &&  canDX > 35 ? canDX : canX;

      $('.user-col .cannon').css({
        transform: 'translateX(' + ( canX ) + 'px)'
      })      
      $('.user-col .wheel').css({
        transform: 'rotate(' + ( canX ) + 'deg)'
      })
  })
  
  // Remove
  $(this).mouseup(()=>{
      $(this).unbind("mousemove");
      userCanX = canX;
  });
  
});


// Set User Cannon pipe Angle 
$('.level-handle').mousedown((e)=>{
  const clickY = e.pageY;
  let canY  = 0;
  $(this).mousemove((e)=>{
    let canDY = ( e.pageY - clickY ) + userCanY;    
     canY  = canDY < 65 && canDY > -5 ? canDY : canY;
    
      $('.level-handle').text(canY);
    
      $('.user-col .pipe').css({
        transform: 'rotate(' + ( canY ) + 'deg)'
      })      
  });
  
  // Remove
  $(this).mouseup(()=>{
      $(this).unbind("mousemove");
      userCanY = canY;
  });
  
})


// Remove All mousemove events
$(document).mouseup(()=>{
   $(this).unbind("mousemove")
});