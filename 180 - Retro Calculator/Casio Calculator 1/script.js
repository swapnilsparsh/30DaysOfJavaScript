$(document).ready(function() {
  
  $('.show-result').focus(function() {
    $(this).blur();
  });
  
  function captureOne() {
    $('.show-result').get(0).value += '1';
  }
  
  function captureTwo() {
    $('.show-result').get(0).value += '2';
  }

  function captureThree() {
    $('.show-result').get(0).value += '3';
  }

  function captureFour() {
    $('.show-result').get(0).value += '4';
  }

  function captureFive() {
    $('.show-result').get(0).value += '5';
  }

  function captureSix() {
    $('.show-result').get(0).value += '6';
  }

  function captureSeven() {
    $('.show-result').get(0).value += '7';
  }

  function captureEight() {
    $('.show-result').get(0).value += '8';
  }

  function captureNine() {
    $('.show-result').get(0).value += '9';
  }

  function captureZero() {
    $('.show-result').get(0).value += '0';
  }
  
  function capturePoint() {
    $('.show-result').get(0).value += '.';
  }

  function capturePlus() {
    $('.show-result').get(0).value += '+';
  }

  function captureMinus() {
    $('.show-result').get(0).value += '-';
  }

  function captureDivision() {
    $('.show-result').get(0).value += '/';
  }

  function captureMultiply() {
    $('.show-result').get(0).value += '*';
  }

  function clear() {
    $('.show-result').val('');
  }
  
  function roundDecimals(number) {
    number = number.toString().split('');
    if (number.indexOf('.') !== -1) {
      let numTest = number.slice(number.indexOf('.') + 1, number.length);
      number = number.slice(0, number.indexOf('.') + 1);
      let i = 0;
      while (numTest[i] < 1) {
        i++;
      }
      numTest = numTest.join('').slice(0, i + 2);
      if ( numTest[numTest.length-1] === '0' ) {
        numTest = numTest.slice(0, -1);
      }
      return number.join('') + numTest;
    }
    else {
      return number.join('');
    }
  }

  function solve() {
    let equals = eval($('.show-result').val());
    $('.show-result').val((roundDecimals(equals)));
  }

  $('.one').on('click', function() {
    captureOne();    
  });
  
  $('.two').on('click', function() {
    captureTwo();
  });
  
  $('.three').on('click', function() {
    captureThree(); 
  });
  
  $('.four').on('click', function() {
    captureFour();
  });
  
  $('.five').on('click', function() {
    captureFive();
  });
  
  $('.six').on('click', function() {
    captureSix();
  });
  
  $('.seven').on('click', function() {
    captureSeven();
  });
  
  $('.eight').on('click', function() {
    captureEight();
  });
  
  $('.nine').on('click', function() {
    captureNine();  
  });
  
  $('.zero').on('click', function() {
    captureZero();
  });
  
  $('.point').on('click', function() {
    capturePoint();
  });
  
  $('.plus').on('click', function() {
    capturePlus();
  });
  
  $('.multiply').on('click', function() {
    captureMultiply();
  });
  
  $('.division').on('click', function() {
    captureDivision();
  });
  
  $('.minus').on('click', function() {
    captureMinus();
  });
  
  $('.clear').on('click', function() {
    clear();
  });
  
  $('.equal').on('click', function() {
    solve();
  });
  
  $('.calculator').on('click', function() {
    if ( $('.show-result').val().length > 13 ) {
      $('.show-result').val('LIMITE EXCEDIDO');
      setTimeout(function() {
        clear();
      }, 500);
    }
  });
  
  $(document).on('keydown', function(e) {
    if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 67)
		$('.clear').trigger('click');
    if (e.keyCode == 13 || e.keyCode == 32)
		$('.equal').trigger('click');
    if (e.keyCode == 48 || e.keyCode == 96)
		$('.zero').trigger('click');
    if (e.keyCode == 49 || e.keyCode == 97)
		$('.one').trigger('click');
    if (e.keyCode == 50 || e.keyCode == 98)
		$('.two').trigger('click');
    if (e.keyCode == 51 || e.keyCode == 99)
		$('.three').trigger('click');
    if (e.keyCode == 52 || e.keyCode == 100)
		$('.four').trigger('click');
    if (e.keyCode == 53 || e.keyCode == 101)
		$('.five').trigger('click');
    if (e.keyCode == 54 || e.keyCode == 102)
		$('.six').trigger('click');
    if (e.keyCode == 55 || e.keyCode == 103)
		$('.seven').trigger('click');
    if (e.keyCode == 56 || e.keyCode == 104)
		$('.eight').trigger('click');
    if (e.keyCode == 57 || e.keyCode == 105)
		$('.nine').trigger('click');
    if (e.keyCode == 88 || e.keyCode == 106)
		$('.multiply').trigger('click');
    if (e.keyCode == 107 || e.keyCode == 187)
		$('.plus').trigger('click');
    if (e.keyCode == 110 || e.keyCode == 188 || e.keyCode == 190)
		$('.point').trigger('click');
    if (e.keyCode == 111 || e.keyCode == 219)
		$('.division').trigger('click');
    if (e.keyCode == 189 || e.keyCode == 109)
		$('.minus').trigger('click');
  });
  
});