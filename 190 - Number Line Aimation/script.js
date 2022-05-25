$('.spin-btn').click(function(){
  
  let wOne =  Math.floor(Math.random() * 19) - 9;
  let se =  Math.floor(Math.random() * 19) - 9 ;
  let wTwo =  (se + wOne) < 9 && (se + wOne) > -9 ? se : -se;
  let def = Math.abs((wOne + wTwo ));
  let abDef = Math.abs(wOne) +  Math.abs(wTwo);
  
  let getRotation = (val)=>  Math.sign(val) < 1? 0 : 180;  
  

  
//   reset
   $('.player').css({
      left : '450px',
      transition: 'left 0s 0s linear',
      animation: 'none'
   });
  
   $('.wheel').css({ 
      transform : 'translateY(-1008px)' ,
      transition: '0s ease-in-out'
   })   
  $('.start-arrow , .end-arrow ').css({ 
      left : '475px',
      opacity : 0 ,
      width: 0,
      transition: '0s 0s ease-in',
   })

  
  setTimeout(function(){
    
      $('#wheel-1').css({
        transform : 'translateY('+   (wOne - 9) * 112  +'px)',
        transition: '3s ease-in-out'
      })  

      $('#wheel-2').css({
        transform : 'translateY('+   (wTwo - 9) * 112  +'px)',
        transition: '3s ease-in-out'
      })
    
      $('.player').css({
          // left :  ( -(wOne + wTwo ) + 9) * 50  + 'px',
          left :  ( -(wOne  ) + 9) * 50  + 'px',
          transitionProperty: 'left',
          transitionDelay: '3.3s',
          transitionTimingFunction:   'linear',
          transitionDuration: 0.5 *  Math.abs(wOne) +  's',
          animationName :  'jumping',
          animationDuration : '0.5s',
          animationTimingFunction : 'steps(4)',
          animationDelay: '3.3s',
          animationIterationCount  : abDef,
          transform: 'rotateY(' + getRotation(wOne ) + 'deg)'
    })
      // Return to Answer
      setTimeout(function(){
           $('.player').css({
              left :  ( -(wOne + wTwo ) + 9) * 50  + 'px',
              transitionDelay: '0s',
              transitionDuration: 0.5 *  Math.abs(wTwo) +  's',
             transform: 'rotateY(' + getRotation( wTwo) + 'deg)'
           })
                
      }, ( 500 *  Math.abs(wOne)) + 3300 )

    $('.start-arrow').css({ 
      opacity : 1 ,
      width:  Math.abs(wOne) * 50 +'px',
      transform: 'rotateY(' + getRotation(wOne) + 'deg)',
      transition: 'opacity 0.3s 3s ease-in',
    })    
    $('.end-arrow').css({ 
      opacity : 1 ,
      left: 475 - (wOne * 50)  + 'px',
      width:  Math.abs(wTwo) * 50 +'px',
      transform: 'rotateY(' + getRotation( wTwo ) + 'deg)',
      transition: 'opacity 0.3s 3.3s ease-in',
      transitionDelay:     ( 0.5 *  Math.abs(wOne)) + 3     + 's',
    })    

    
  },500)
  


});