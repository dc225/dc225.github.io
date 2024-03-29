/*! glitch-canvas by snorpey, MIT License */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.glitch=b()}(this,function(){function a(a,k,l){if(i(a)&&j(k,"parameters","object")&&j(l,"callback","function")){for(n=h(k),b(v,a),b(w,a),o=d(a,n.quality),p=f(o),q=e(p),t=0,u=n.iterations;u>t;t++)c(p,q,n.seed,n.amount,t,n.iterations);r=new Image,r.onload=function(){x.drawImage(r,0,0),s=x.getImageData(0,0,a.width,a.height),l(s)},r.src=g(p)}}function b(a,b){a.width!==b.width&&(a.width=b.width),a.height!==b.height&&(a.height=b.height)}function c(a,b,c,d,e,f){var g=a.length-b-4,h=parseInt(g/f*e,10),i=parseInt(g/f*(e+1),10),j=i-h,k=parseInt(h+j*c,10);k>g&&(k=g);var l=Math.floor(b+k);a[l]=Math.floor(256*d)}function d(a,b){var c="number"==typeof b&&1>b&&b>0?b:.1;y.putImageData(a,0,0);var d=w.toDataURL("image/jpeg",c);switch(d.length%4){case 3:d+="=";break;case 2:d+="==";break;case 1:d+="==="}return d}function e(a){var b=417;for(t=0,u=a.length;u>t;t++)if(255===a[t]&&218===a[t+1]){b=t+2;break}return b}function f(a){var b,c,d,e=[];for(t=23,u=a.length;u>t;t++){switch(c=B[a.charAt(t)],b=(t-23)%4){case 1:e.push(d<<2|c>>4);break;case 2:e.push((15&d)<<4|c>>2);break;case 3:e.push((3&d)<<6|c)}d=c}return e}function g(a){var b,c,d,e=["data:image/jpeg;base64,"];for(t=0,u=a.length;u>t;t++){switch(c=a[t],b=t%3){case 0:e.push(A[c>>2]);break;case 1:e.push(A[(3&d)<<4|c>>4]);break;case 2:e.push(A[(15&d)<<2|c>>6]),e.push(A[63&c])}d=c}return 0===b?(e.push(A[(3&d)<<4]),e.push("==")):1===b&&(e.push(A[(15&d)<<2]),e.push("=")),e.join("")}function h(a){return{seed:(a.seed||0)/100,quality:(a.quality||0)/100,amount:(a.amount||0)/100,iterations:a.iterations||0}}function i(a){return j(a,"image_data","object")&&j(a.width,"image_data.width","number")&&j(a.height,"image_data.height","number")&&j(a.data,"image_data.data","object")&&j(a.data.length,"image_data.data.length","number")&&k(a.data.length,"image_data.data.length",l,"> 0")?!0:!1}function j(a,b,c){return typeof a===c?!0:(m(a,"typeof "+b,'"'+c+'"','"'+typeof a+'"'),!1)}function k(a,b,c,d){return c(a)===!0?!0:(m(a,b,d,"not"),void 0)}function l(a){return a>0}function m(a,b,c,d){throw new Error("glitch(): Expected "+b+" to be "+c+", but it was "+d+".")}var n,o,p,q,r,s,t,u,v=document.createElement("canvas"),w=document.createElement("canvas"),x=v.getContext("2d"),y=w.getContext("2d"),z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",A=z.split(""),B={};return A.forEach(function(a,b){B[a]=b}),a});

(function($) {
  "use strict";
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    img = new Image(),
    w,
    h,
    offset,
    glitchInterval;
    img.src = 'https://defcon225.org/assets/images/header.jpg';
  img.onload = function() {
    initGlitch();
    window.onresize = initGlitch;
  };
  var initGlitch = function() {
    clearInterval(glitchInterval);
    canvas.width = w = $("#canvas").parent().parent().width();
    offset = w * '.1';
    canvas.height = h = ($("#canvas").parent().parent().width() / 4.746);
    glitchInterval = setInterval(function() {
      clear();
      context.drawImage(img, 0, 0, img.width, 800, 0, 0, w, h);
      setTimeout(glitchImg, randInt(250, 1000));
    }, 500);
  };
  var clear = function() {
    context.rect(0, 0, w, h);
    context.fillStyle = 'black';
    context.fill();
  };
  var glitchImg = function() {
    for (var i = 0; i < randInt(1, 13); i++) {
      var x = Math.random() * w;
      var y = Math.random() * h;
      var spliceWidth = w - x;
      var spliceHeight = randInt(5, h / 3);
      context.drawImage(canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
      context.drawImage(canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
    }
  };
  var randInt = function (a, b) {
    return ~~(Math.random() * (b - a) + a);
  };
  function distortCanvas(canvas, delay) {
    var ctx = canvas.getContext('2d');
    var originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var drawImageData = function (imageData) {
        ctx.putImageData(imageData, 0, 0);
    };
    delay = delay || 40;
    var duration = 0;
    var state = 'startrest';
    setInterval(function() {
        switch (state) {
        case 'glitch':
          if (duration > 0) {
            duration -= delay;
            var parameters = {
              amount: 1,
              seed: Math.round(Math.random() * 100),
              iterations: 5,
              quality: 30
            };
            glitch(imageData, parameters, drawImageData);
          } else {
            state = 'startrest';
          }
          break;
        case 'rest':
          if (duration > 0) {
            duration -= delay;
          } else {
            state = 'startglitch';
          }
          break;
        case 'startglitch':
          duration = (Math.random() + 1) * 1000;
          state = 'glitch';
          imageData.data.set(new Uint8ClampedArray(originalImageData.data));
          break;
        case 'startrest':
          duration = (Math.random() + 1) * 1000;
          state = 'rest';
          drawImageData(originalImageData);
          break;
        }
    }, delay);
  }
  function distortNode(node) {
    html2canvas(node, {
      onrendered: function (canvas) {
        node.style.display = "none";
        node.parentNode.appendChild(canvas);
        distortCanvas(canvas);
      }
    });
  }
  distortNode(document.getElementById('copy'));
}(jQuery));

