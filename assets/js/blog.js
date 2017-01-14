(function($) {
  "use strict";

  $.ajax({
    type: "GET",
    url: "http://defcon225.org/feed.xml",
    dataType: "xml",
    success: function( xml ) {
      var x = 0;
      $(xml).find("entry").each(function() {
        if( x < 4 ) {
          $("#blog_feed").append('<a href="' + $(this).find("link").attr("href") + '" class="list-group-item"><h4>' + $(this).find("title").text() + '</h4></a>');
          x++;
        }
        else {
          return false;
        }
      });
    }
  });

}(jQuery));
