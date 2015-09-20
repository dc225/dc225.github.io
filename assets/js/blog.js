(function($) {
  "use strict";

  $.ajax({
    type: "GET",
    url: "/feed.xml",
    dataType: "xml",
    success: function( xml ) {
      $(xml).find("entry").each(function() {
        console.log($(this).find("title").text());
      });
    }
  });

}(jQuery));
