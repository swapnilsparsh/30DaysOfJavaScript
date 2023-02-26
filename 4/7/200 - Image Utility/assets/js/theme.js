document.querySelectorAll('.datepicker').forEach(function(field) {
	var picker = new Pikaday({
		field: field
	});
});