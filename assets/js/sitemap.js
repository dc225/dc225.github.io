(function($) {
  "use strict";

$.ajax({
  type: "GET",
  url: "https://defcon225.org/sitemap.xml",
  dataType: "xml",
  success: function( xml ) {
    xml = $(xml).find("loc");
    var x, y = [];
      for(x = 0; x < xml.length; x++) { y.push(xml[x].innerHTML); }
        y.reverse();
      for(x = 0; x < xml.length; x++) {
        var url = y[x];
        $("#sitemap").append('<a href="' + url + '" class="list-group-item">' +
        '<h4>' + url + '</h4></a>');
      }
  }
});

}(jQuery));
