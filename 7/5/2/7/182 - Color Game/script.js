$(document).ready(function() {

	let round = 1;
	let colors = [];
	let counter = 1;
	let counterSequence = 0;
	let counterPlayer = 0;
	let stop = 'off';
	let colour;
	let timeDelaySequence = 1000;
	
	function playLoad() {
		$('#btn-start').on('click', function() {
			$(this).parent().addClass('hide');
			setTimeout(  sequence, timeDelaySequence / 2 );
		});
	}

	function aleatory() {
		numberAleatory = 1 + Math.floor(Math.random() * 4);
		numberAleatory == 1 ? colour = 'red' : '';
		numberAleatory == 2 ? colour = 'green' : '';
		numberAleatory == 3 ? colour = 'blue' : '';
		numberAleatory == 4 ? colour = 'yellow' : '';
		colourActual = colour;
		return colour;
	}

	function sequence() {
		stop = 'off';
		$('#result').text('Playing...');
		$('#round-level').text(`You have reached the level ${ round }`);
		$('#round').text(round);

		for( i = 0; i < counter; i++ ) {
			colors[i] = aleatory();
		}

		followSequence();
	}

	function followSequence() {

		if ( counterSequence < colors.length && stop != 'on' ) {
			reproduce(colors[counterSequence]);
			counterSequence++;
			setTimeout( followSequence, timeDelaySequence );
		}

	}

	function reproduce(vColour) {

		let sound = $(`.${ vColour }`).attr('data-sound');
		new Audio(sound).play();
		$(`.${ vColour }`).addClass('active');

		setTimeout( function() {
			$(`.${ vColour }`).removeClass('active');
		}, timeDelaySequence / 2);
		
	}

	function resetPlay() {
		$('.modal').removeClass('hide');
		
		round = 1;
		colors = [];
		counter = 1;
		counterSequence = 0;
		counterPlayer = 0;
	 	stop = 'off';
	}

	$('.colors').on('click', function() {

		stop = 'on';

		if ( $(this).hasClass(colors[counterPlayer]) ) {
			let sound = $(this).attr('data-sound');
			new Audio(sound).play();
			counterPlayer++;

			if ( counterPlayer == colors.length ) {
				$('#result').text('Good :)');
				counter++;
				round++;
				counterSequence = 0;
				counterPlayer = 0;
				setTimeout( sequence, timeDelaySequence * 2 );
			}
		} else {
				let soundLose = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/507450/Fail.wav');
				soundLose.play();
				$('#result').text('You Lost :(');
				resetPlay();
			}

	});

	playLoad();

});