(function($) {
  "use strict";

  $.ajax({
    type: "GET",
    url: "https://defcon225.org/feed.xml",
    dataType: "xml",
    success: function( xml ) {
      var x = 0;
      $(xml).find("entry").each(function() {
        if( x < 5 ) {
          var datetime = moment($(this).find("published").text()).format("dddd, MMMM Do, YYYY");

          $("#blog_feed").append(`<a href="${$(this).find("link").attr("href")}" class="list-group-item">
            <h4>${$(this).find("title").text()}</h4>
            <small><i class="fa-solid fa-fw fa-calendar" aria-hidden="true"></i> <em>${datetime}</em></small>
          </a>`);
          x++;
        }
        else {
          return false;
        }
      });
    }
  });

  $.ajax({
		type: "GET",
		url: "https://defcon.social/@dc225.rss",
		dataType: "xml",
		success: function(xml) {
      var x = 0;
      $(xml).find("item").each(function() {
        if( x < 5 ) {
          var post = new DOMParser().parseFromString($(xml).find("item description")[x].innerHTML, "text/html").body.textContent;
          var datetime = new DOMParser().parseFromString($(xml).find("item pubDate")[x].innerHTML, "text/html").body.textContent;
            datetime = moment(datetime).format("dddd, MMMM Do, YYYY [at] h:mm:ss a");

          $("#social_media").append(`<div class="list-group-item">
              <div style="color:#000">${post}</div>
              <div style="border-top:1px #eee dashed;margin-top:10px" class="text-right">
                <a href="${$(xml).find("item link")[x].innerHTML}" class="btn-xs">
                  <small><i class="fa-solid fa-fw fa-calendar" aria-hidden="true"></i> <em>${datetime}</em></small>
                </a>
              </div>
            </div>
          `);
          x++;
        }
        else {
          return false;
        }
      });
		}
	});

}(jQuery));
