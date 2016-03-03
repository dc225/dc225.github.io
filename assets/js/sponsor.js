(function($){
	var sponsors = {
		mediumRectangle: [
			
		]
	}, r;
	
	$(".mediumRectangleSponsor").each(function() {
		r = Math.floor(Math.random() * sponsors.mediumRectangle.length);
		$(this).html('<a href="' + sponsors.mediumRectangle[r][1] + '" title="' + sponsors.mediumRectangle[r][2] + '" target="_blank"><img src="' +
		sponsors.mediumRectangle[r][0] + '" alt="' + sponsors.mediumRectangle[r][2] + '" border="0" /></a>');
	});
}(jQuery));
