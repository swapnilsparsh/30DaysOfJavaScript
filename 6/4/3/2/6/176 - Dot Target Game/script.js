$(document).ready(function() {

	let totalPoints = 0;
	let points = 0;

	$('[class$="-circle"]').on('click', 'span', function(e) {
		
		e.stopPropagation();
		$(this).parent().hasClass('first-circle') ? points = 10 : '';
		$(this).parent().hasClass('second-circle') ? points = 5 : '';
		$(this).parent().hasClass('third-circle') ? points = 3 : '';
		$(this).parent().hasClass('fourth-circle') ? points = 1 : '';
		totalPoints += points;
		showParcial();

	});

	function showParcial() {
		$('.parcial').text(points);
		$('.parcial').fadeIn('fast').fadeOut('slow');
		$('#points').text(totalPoints);
	}

});