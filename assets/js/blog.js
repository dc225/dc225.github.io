(function($) {
  "use strict";

  $.ajax({
    type: "GET",
    url: "/feed.xml",
    dataType: "xml",
    success: function( xml ) {
      $(xml).find("entry").each(function() {
        $("#blog_feed").append('<a href="' + $(this).find("link").text() + '" class="list-group-item"><h4>' + $(this).find("title").text() + '</h4></a>');
      });
    }
  });

}(jQuery));
