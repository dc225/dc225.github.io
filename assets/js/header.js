(function($) {
  "use strict";


    var quotes = [
      "This is our world now...",
      "The world of the electron and the switch, the beauty of the baud"
    ];

    /*
    var r = Math.floor((Math.random() * quotes.length));
    $(".header").html('<div class="header-quote">' + quotes[r] + '</div>');
    */

    $.getScript("https://cdn.rawgit.com/camwiegert/baffle/91c397fe/dist/baffle.min.js", function() {
      var b = baffle('p');
      b.once();
      b.reveal(3500, 100);
    });

}(jQuery));
