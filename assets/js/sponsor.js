(function($){
	var sponsors = {
		mediumRectangle: [
			['https://s3-us-west-2.amazonaws.com/63306e6675736564/sponsors/unixstickers-300x250.jpg', 'http://unixstickers.refr.cc/4W8JFQT', '$5 coupon at Unixstickers']
		]
	}, r;
	
	$(".mediumRectangleSponsor").each(function() {
		r = Math.floor(Math.random() * sponsors.mediumRectangle.length);
		$(this).html('<a href="' + sponsors.mediumRectangle[r][1] + '" title="' + sponsors.mediumRectangle[r][2] + '" target="_blank"><img src="' +
		sponsors.mediumRectangle[r][0] + '" alt="' + sponsors.mediumRectangle[r][2] + '" border="0" /></a>');
	});
}(jQuery));