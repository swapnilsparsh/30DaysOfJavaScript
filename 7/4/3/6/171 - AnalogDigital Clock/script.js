(function() {

  
  var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
],
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
	function getTime() {
    
		var date = new Date(),
    second  = date.getSeconds() ,
    minute  = date.getMinutes() ,
    hour    = date.getHours() ,
    time = date.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true }),
     day =  date.getDay() ,
    month = date.getMonth() ,
    date = date.getDate() +' . '+ months[month],
        
		ds = second * -6,
		dm = minute * -6,
		dh = hour * -30;
    
		$('.second').css('transform', 'rotate(' + ds + 'deg)');
    $('.minute').css('transform', 'rotate(' + dm + 'deg)');
    $('.hour').css('transform', 'rotate(' + dh + 'deg)');
    
    $('.time').text(time);
    $('.day').text(days[day]);
    $('.date').text( date )
	}
  
  function dailer( selector , size){
     for(var s = 0; s < 60 ; s++){
      $(selector).append('<span style="transform: rotate('+ 6 * s +'deg) translateX('+ size +'px)">'+s+'</span>')
    }
  }
  
  dailer( '.second' , 195);
  dailer( '.minute' , 145);
  dailer( '.dail' , 230);
  
  for(var s = 1; s < 13 ; s++){
      $('.hour').append('<span style="transform: rotate('+ 30 * s +'deg) translateX(100px)">'+s+'</span>')
    }
  
  
  setInterval(getTime, 1000);
  getTime();
  
} ());