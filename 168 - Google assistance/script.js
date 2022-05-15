{
let custCount=0;
let conversation = [{prompt:"How can i help?", utterance:"I like to pay this bill"},
       {prompt:"What amount do you like to pay?", utterance:"Hu! Please pay the minimum amount for now"},
       {prompt:"OK, Paying minimum payment amount of $25", utterance:"OK"},
       {prompt:"Do you need any other help?", utterance:"No, Thanks"}]; 
  
    $('.speech-to-text').on('click', function(){
        $(this).toggleClass('listen');
        $(".bubbles").append('<div id="divc'+custCount+'" class="box3 sb13"></div>');
        new TxtType($("#divc"+custCount++), "Please find me a ride to Union Square");        
        $(".bubbles").find(':first-child').remove();
    });

    var TxtType = function(el, toRotate) {
            this.toRotate = toRotate;
            this.el = el;
            this.txt = '';
            this.tick();
    };
    TxtType.prototype.tick = function() {
        var fullTxt = this.toRotate;
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        this.el.html(this.txt);
      
        var that = this;
        var delta = 50;
        if (this.txt === fullTxt) {
            $('.speech-to-text').toggleClass('listen');
            return;
        }
        setTimeout(function() {
          that.tick();
        }, delta);
    };

  
  ///////////
  var TimedQueue = function(defaultDelay){
      this.queue = [];
      this.index = 0;
      this.defaultDelay = defaultDelay || 10000;
  };

  TimedQueue.prototype = {
      add: function(fn, delay){
          this.queue.push({
              fn: fn,
              delay: delay
          });
      },
      run: function(index){
          (index || index === 0) && (this.index = index);
          this.next();
      },
      next: function(){
          var self = this
          , i = this.index++
          , at = this.queue[i]
          , next = this.queue[this.index]
          if(!at) return;
          at.fn();
          next && setTimeout(function(){
              self.next();
          }, next.delay||this.defaultDelay);
      },
      reset: function(){
          this.index = 0;
      }
  }


  var x = new TimedQueue(8001 );
  conversation.map((dialog, ind)=>{
       Object.keys(dialog).forEach(function(key,index) {
         if(key==='prompt'){
            x.add(function(){
              $(".bubbles").append('<div id="divp'+ind+'" class="box3 sb13">'+dialog[key]+'</div>');
              $('.speech-to-text').toggleClass('listen');
            }, 5000);
            
         }else if(key==='utterance'){
            x.add(function(){
              if(dialog[key] && dialog[key]!=''){
                 $(".bubbles").append('<div id="divu'+ind+'" class="box3 sb14">'+dialog[key]+'</div>');              
                 new TxtType( $("#divu"+ind), dialog[key] ); 
              }
            }, 2000);
         }  
       });
  });
  
  x.run();
}