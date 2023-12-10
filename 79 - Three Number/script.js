$(document).ready(function() {

	let speed = 1000;

	let round = 1;
	let win = false;
	let numberOne;
  let numberTwo;
	let numberThree;

	let timeOne;
	let timeTwo;
	let timeThree;

	let stopOne = false;
	let stopTwo = false;
	let stopThree = false;

	changeNumberOne();
	changeNumberTwo();
	changeNumberThree();
	
	function numberRandom() {
		cypher = Math.floor( Math.random() * 10 );
		return cypher;
	}

	function changeNumberOne() {
		numberOne = numberRandom();
		$('.cypher-1').children('span').text(numberOne);
		timeOne = setTimeout(changeNumberOne, speed);
	}

	function changeNumberTwo() {
		numberTwo = numberRandom();
		$('.cypher-2').children('span').text(numberTwo);
		timeTwo = setTimeout(changeNumberTwo, speed - 200);
	}

	function changeNumberThree() {
		numberThree = numberRandom();
		$('.cypher-3').children('span').text(numberThree);
		timeThree = setTimeout(changeNumberThree, speed - 100);
	}

	function checkResult() {

		if ( stopOne == true && stopTwo == true && stopThree == true ) {
			if ( numberOne == numberTwo && numberTwo == numberThree ) {
				win = true;
				$('#reset').fadeIn();
				$('#result').children('p').children('#content-result').addClass('good').text('You Have Won :)');
				$('#reset').children('button').text('Next Rond');
			} else {
					win = false;
					$('#reset').fadeIn();
					$('#result').children('p').children('#content-result').addClass('bad').text('You Lost :(');
					$('#reset').children('button').text('Restart');
				}
		}

	}

	$('[class^="cypher-"]').on('click', function() {

		if ( $(this).hasClass('cypher-1') ) {
			stopOne = true;
			clearTimeout(timeOne);
			$('.cypher-1').children('span').addClass('active').text(numberOne);
			checkResult();
		}

		if ( $(this).hasClass('cypher-2') ) {
			stopTwo = true;
			clearTimeout(timeTwo);
			$('.cypher-2').children('span').addClass('active').text(numberTwo);
			checkResult();
		}

		if ( $(this).hasClass('cypher-3') ) {
			stopThree = true;
			clearTimeout(timeThree);
			$('.cypher-3').children('span').addClass('active').text(numberThree);
			checkResult();
		}

	});

	$('#reset').on('click', function() {

		if ( win == true ) {
			round++;
			speed -= 250;
		}	else {
				round = 1;
				speed = 1000;
			}

		$(this).fadeOut();
		$('.active').removeClass('active');
		$('#result').children('p').children('#round').text(`${ round }:`).siblings('#content-result').removeClass('good bad').text('Click and get 3 equal Numbers');
		stopOne = false;
		stopTwo = false;
		stopThree = false;

		changeNumberOne();
		changeNumberTwo();
		changeNumberThree();

	});

});