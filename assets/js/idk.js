(function($) {
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };
  
  if(isMobile.any() === null) {
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" type="text/css" />');
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js", function() {
      var x, dcgos = {};
      
      window.dcgos = dcgos;
      
      dcgos.ram = {};
      
      dcgos.styles = [
        '.minimizedTitle { float: left; border-right: 1px #000 solid; width: 15%; min-width: 250px; max-width: 300px; height: 25px; background-color: #ffF; padding: 3px;  } .minimizedTitle .strong { float: left; width: 200px; font-weight: bold; }',
        '.windowIcons { padding-left: 3px; padding-right: 3px; } #windowbar { position: fixed; min-height: 25px; bottom: 0; left: 0; right: 0; display: none; border-top: 1px #000 solid; }',
        '.windowTitle { background-color:#ffF; }'
      ];
      
      dcgos.windows = {
        'website': "#content-thing"
      };
      
      dcgos.windowStateChange = function(newState) {
        if(newState == 'maximize') {
          dcgos.ram.fullScreen = true;
          $(".resizable").resizable({ disabled: true });
          $(".resizable").draggable({ disabled: true });
          $("#windowbar").hide();
          $(".resizable").hide();
        }
        
        else {
          if(dcgos.ram.fullScreen) $("#windowbar").show();
          if(dcgos.ram.fullScreen) $("body").attr("style", "background-color:#000;background-image:url('/assets/uploads/hacktheplanet.webp');background-repeat: no-repeat;background-attachment: fixed;background-position: center;");
          
          if(dcgos.ram.fullScreen) $("#windowbar").show();
          if(dcgos.ram.fullScreen) dcgos.ram.fullScreen = false;
        }
      };

      dcgos.windowRestore = function(windowName) {
        $(dcgos.windows[windowName] + " .windowIcons").html('<a href="javascript:dcgos.windowMinimize(\'' + windowName + '\');"><i class="fa-solid fa-window-minimize" aria-hidden="true"></i></a> ' +
            '<a href="javascript:dcgos.windowMaximize(\'' + windowName + '\');"><i class="fa-solid fa-window-maximize" aria-hidden="true"></i></a>');
        
        $(dcgos.windows[windowName]).show();
        $(dcgos.windows[windowName]).attr("style", "border:1px #000 solid; background-color:#333; width: 50%; height: 300px;");
        $(dcgos.windows[windowName]).css("overflow", "auto");
        $("#minimizedTitle-" + windowName).hide();
          
        dcgos.windowStateChange('restore');
        
        $(dcgos.windows[windowName]).resizable({
            alsoResize: '',
            disabled: false
          });
          
        $(dcgos.windows[windowName]).draggable({ disabled: false });
      };

      dcgos.windowMaximize = function(windowName) {
        dcgos.windowStateChange('maximize');
        
        if(windowName == 'website') $("body").attr("style", "background-color:#333");
        
        $(dcgos.windows[windowName]).attr("style", "");
        if($(dcgos.windows[windowName]).is(":hidden")) $(dcgos.windows[windowName]).show();
        
        $(dcgos.windows[windowName] + " .windowIcons").html('<a href="javascript:dcgos.windowMinimize(\'' + windowName + '\');"><i class="fa-solid fa-window-minimize" aria-hidden="true"></i></a> ' +
          '<a href="javascript:dcgos.windowRestore(\'' + windowName + '\');"><i class="fa-solid fa-window-restore" aria-hidden="true"></i></a>');
        
        
      };

      dcgos.windowMinimize = function(windowName) {
        $(dcgos.windows[windowName]).hide();
        $("#minimizedTitle-" + windowName).show();
        dcgos.windowStateChange('minimize');
      };
      
      dcgos.bootup = function() {
        for(x = 0; x < dcgos.styles.length; x++) {
          $('body').prepend('<stylE>' + dcgos.styles[x] + '</stylE>');
        }
          
        $("body").prepend('<div id="windowbar" class="clearfix"></div>');
        
        $("#content-thing").prepend('<div class="clearfix windowTitle"><div class="pull-right windowIcons">' +
          '<a href="javascript:dcgos.windowMinimize(\'website\');"><i class="fa-solid fa-window-minimize" aria-hidden="true"></i></a> ' +
          '<a href="javascript:dcgos.windowRestore(\'website\');"><i class="fa-solid fa-window-restore" aria-hidden="true"></i></a>' +
          '</div><div class="strong">' + document.title + '</div></div>');
          
          $("#windowbar").prepend('<div class="minimizedTitle" id="minimizedTitle-website"><div class="pull-right windowIcons">' +
          '<a href="javascript:dcgos.windowRestore(\'website\');"><i class="fa-solid fa-window-restore" aria-hidden="true"></i></a> ' +
          '<a href="javascript:dcgos.windowMaximize(\'website\');"><i class="fa-solid fa-window-maximize" aria-hidden="true"></i></a>' +
          '</div><div class="strong">' + document.title + '</div></div>');
          
          $(".minimizedTitle").hide();
          
        $("#content-thing").addClass('resizable');
          
          dcgos.ram.fullScreen = true;
          dcgos.windowMaximize('website');
      };

      dcgos.bootup();
    });
  }
}(jQuery));
