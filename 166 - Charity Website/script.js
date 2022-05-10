smoothScroll.init();
  setTimeout(function(){
    range.defaultValue = 0;
  },0.1);
  function addClass(el, className){
	    el.className += ' '+className;   
	}

	function removeClass(el, className){
	    var elClass = ' '+el.className+' ';
	    while(elClass.indexOf(' '+className+' ') != -1){
	         elClass = elClass.replace(' '+className+' ', '');
	    }
	    el.className = elClass;
	}

	var range = document.querySelector('input[type="range"]');
	range.defaultValue = 0;
	var button = document.getElementById('donateBtn');
	var patches = [];
	var patchLeft = document.querySelector('.shirt .patch.left');
	var patchCenter = document.querySelector('.shirt .patch.center');
	var patchShorts = document.querySelector('.shorts .patch');
	var dirtLeft = document.querySelector('.head .dirt.left');
	var dirtRight = document.querySelector('.head .dirt.right');
	var mouth = document.querySelector('.mouth');
	var eyesLeft = document.querySelector('.eyes.left');
	var eyesRight = document.querySelector('.eyes.right');
	var shirt = document.querySelector('.shirt');
	var shorts = document.querySelector('.shorts');
	var footLeft = document.querySelector('.shorts .legs.left .foot');
	var footRight = document.querySelector('.shorts .legs.right .foot');
	var ball = document.querySelector('.ball');
	var cap = document.querySelector('.cap');
	var bag = document.querySelector('.bag');

	patches.push(patchLeft);
	patches.push(patchCenter);
	patches.push(patchShorts);
	patches.push(dirtLeft);
	patches.push(dirtRight);
	patches.push(mouth);
	patches.push(eyesLeft);
	patches.push(eyesRight);
	patches.push(shirt);
	patches.push(shorts);
	patches.push(footLeft);
	patches.push(footRight);
	patches.push(ball);
	patches.push(cap);
	patches.push(bag);
	var prev = 0;

	var getValue = function(){
	  var current = 0;
	  var newVal = range.value;
	  if(newVal > 0) {
	    addClass(button,"appear");
	    //Remove the Left Patch
	    if(newVal >= 10 && newVal < 20 && newVal >= prev){
	        current = 0;
	        removeClass(patches[current], "ap-left");
	        addClass(patches[current],"dis-left");
	        prev = newVal;
	    } 
	    //Add the Left Patch
	    else if(newVal >= 10 && newVal < 20 && newVal < prev){
	     	current = 1;
	      	removeClass(patches[current],"dis-left"); 
		  	addClass(patches[current],"ap-left");
	      	prev = newVal;
	    } 
	    //Remove the Center Patch
	    else if(newVal >= 20 && newVal < 30 && newVal >= prev){
	        current = 1;
	        removeClass(patches[current], "ap-left");
	        addClass(patches[current],"dis-left");
	        prev = newVal;
	    } 
	    //Add the Center Patch
	    else if(newVal >= 20 && newVal < 30 && newVal < prev){
	      	current = 2;
		  	addClass(patches[current],"ap-left");
		  	removeClass(patches[current],"dis-left"); 
		  	current--;
	      	prev = newVal;
	    } 
	    //Remove the Shorts Patch
	    else if(newVal >= 30 && newVal < 40 && newVal >= prev){
	        current = 2;
	        removeClass(patches[current], "ap-left");
	        addClass(patches[current],"dis-left");
	        prev = newVal;
	    } 
	    //Add the Shorts Patch
	    else if(newVal >= 30 && newVal < 40 && newVal < prev){
	      	current = 4;
	      	while(current >= 3){
			  	addClass(patches[current],"ap-left");
			  	removeClass(patches[current],"dis-left"); 
		  		current--;
		  	}
	      	prev = newVal;
	    } 
	    //Remove the Dirties
	    else if(newVal >= 40 && newVal < 50 && newVal >= prev){
	        current = 3;
	        while(current < 5){
		        removeClass(patches[current], "ap-left");
		        addClass(patches[current],"dis-left");
		        current++;
	    	}
	        prev = newVal;
	    } 
	    //Add the Previous State
	    else if(newVal >= 40 && newVal < 50 && newVal < prev){
	      	current = 9;
	        while(current >= 5){
	        	if(current <= 9 && current > 7){
			        removeClass(patches[current],"new");
		    	} else {
		    		removeClass(patches[current],"semi");
		    	}
		    	current--;
	    	}
	        prev = newVal;
	    } 
	    //Change Mouth and Eyes and the Clothes
	    else if(newVal >= 50 && newVal < 60 && newVal >= prev){
	        current = 5;
	        while(current <= 9){
	        	if(current >= 5 && current < 8){
			        addClass(patches[current],"semi");
		    	} else {
		    		addClass(patches[current],"new");
		    	}
		    	current++;
	    	}
	        prev = newVal;
	    } 
	    //Remove the Shoes
	    else if(newVal >= 50 && newVal < 60 && newVal < prev){
	      	current = 11;
	      	while(current >= 10){
	      		removeClass(patches[current], "shoe"); 
	      		current--;
		  	}
	      	prev = newVal;
	    }
	    //Add Shoes
	    else if(newVal >= 60 && newVal < 70 && newVal >= prev){
	        current = 10;
	        while(current < 12){
	        	addClass(patches[current], "shoe");
	        	current++;
	    	}
	        prev = newVal;
	    } 
	    //Remove Ball
	    else if(newVal >= 60 && newVal < 70 && newVal < prev){
	      	current = 12;
      		removeClass(patches[current], "ap-left");
      		addClass(patches[current],"dis-left"); 
	      	prev = newVal;
	    }
	    //Add Ball
	    else if(newVal >= 70 && newVal < 80 && newVal >= prev){
	        current = 12;
	        removeClass(patches[current], "dis-left");
	        addClass(patches[current], "ap-left");
	        prev = newVal;
	    } 
	    //Remove Cap
	    else if(newVal >= 70 && newVal < 80 && newVal < prev){
	      	current = 13;
      		removeClass(patches[current], "ap-left");
      		addClass(patches[current],"dis-left"); 
	      	prev = newVal;
	    }
	    //Add The Cap
	    else if(newVal >= 80 && newVal < 90 && newVal >= prev){
	        current = 13;
	        removeClass(patches[current], "dis-left");
	        addClass(patches[current], "ap-left");
	        prev = newVal;
	    } 
	    //Remove the Bag
	    else if(newVal >= 80 && newVal < 90 && newVal < prev){
	      	current = 14;
      		removeClass(patches[current], "ap-left");
      		addClass(patches[current],"dis-left"); 
	      	prev = newVal;
	    }
	    //Add The Bag
	    else if(newVal >= 90 && newVal < 100 && newVal >= prev){
	        current = 14;
	        removeClass(patches[current], "dis-left");
	        addClass(patches[current], "ap-left");

	        
	        var temp = patches[5].className.split(" ")
	        if(temp.indexOf("full") > 0){
	        	removeClass(patches[5], "full");
	  			addClass(patches[5],"semi"); 	
	        }
	        prev = newVal;
	    }
	    //Add The Full smile
	    else if(newVal >= 100){
	        current = 5;
	        removeClass(patches[current], "semi");
	        addClass(patches[current], "full");
	        prev = newVal;
	    }
	    //Add everythingx
	    } else {
	    removeClass(button,"appear");
		    for(let i in patches){
		    	if(i <= 6){
			        addClass(patches[i],"ap-left");
			        removeClass(patches[i],"dis-left");
		    	}
		    }
	  	}

	  var c = "$";
	  c = c.concat(newVal);
	  var targetValue = document.querySelector(".value");
	  targetValue.innerHTML = c;
	}
	range.addEventListener("input",getValue);