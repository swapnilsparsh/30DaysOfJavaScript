$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() >= 100) { 
            $('.scrollToTop').fadeIn(); 
        } else { 
            $('.scrollToTop').fadeOut(); 
        } 
    }); 
    $('.scrollToTop').click(function(e){ 
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 500); 
        return false; 
    }); 
  });