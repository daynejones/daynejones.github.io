var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};

document.addEventListener('DOMContentLoaded', function(){ 
  window.windowMaker = (function(){
      var settings = {'windowHeight': 398, 'windowWidth': 548,
          IMAGES: {1: '1.gif', 2: '2.gif'}}

      var URLParams = function(){
          var queryString = window.location.search;
          queryString = queryString.substring(1);
          return parseQueryString(queryString);
      }()

      var userText = function(){
          if (URLParams.hasOwnProperty('text')) {
              return unescape(URLParams.text);
          } else {
              return false;
          }
      }()

      var userImg = function(){
          if (URLParams.hasOwnProperty('img')) {
              return parseInt(URLParams.img);
          } else {
              return false;
          }
      }()

      var userURL = function(){
          if (URLParams.hasOwnProperty('url')) {
              return URLParams.url;
          } else {
              return false;
          }
      }()

      var allQueryStringsPassed = function(){
          return (userText && userImg && userURL);
      }()

      var createWindow = function(){
          // TODO: check for number of windows and delete some
          var browserWidth = document.documentElement.clientWidth;
          var browserHeight = document.documentElement.clientHeight;
          var c = document.createDocumentFragment()
          var div = document.createElement("div");
          var randInt = Math.floor(Math.random() * 30) + 1;

          div.innerHTML = '<marquee scrollamount="' + randInt + '">' + userText + '</marquee>' +
                          '<img src="img/' + settings.IMAGES[userImg] + '">';

          var check = document.createElement("div");
          check.className = "check";
          var close = document.createElement("div");
          close.className = "close";

          close.addEventListener("click", function(){
            if (Math.floor(Math.random() * 10) + 1 > 8) {
              createWindow();
            } else {
              this.parentElement.remove()
            }
          }, false);

          check.addEventListener("click", function(){
            if (Math.floor(Math.random() * 10) + 1 > 8) {
              createWindow();
            } else {
              this.parentElement.remove()
            }
          }, false);

          div.appendChild(check);
          div.appendChild(close);

          div.className = "window";
          div.style.left = Math.floor(Math.random() * (browserWidth - settings.windowWidth)) + "px";
          div.style.top = Math.floor(Math.random() * (browserHeight - settings.windowHeight)) + "px";

          c.appendChild(div);
          document.body.appendChild(c);
      }

      var startCreatingWindows = function(){
          settings.interval = setInterval(createWindow, '3000');
      }

      var stopCreatingWindows = function(){
          clearInterval(settings.interval);
      }

      var selectImage = function(ele){
          deselectImages();
          this.className = "select-gif selected";
      }

      var deselectImages = function(){
          var images = document.getElementsByClassName("select-gif");
          for (var i=0; i < images.length; i++){
              var img = images[i];   
              img.className = "select-gif";
          }
      }

      var setupIframe = function(){
          var iframe = document.getElementById('theFrame');
          if (userURL) {
              iframe.src = userURL;
          } else {
              alert('No url passed');
          }
      }

      var formSubmit = function(evt){
          evt.preventDefault();
          var selectedImage = document.getElementsByClassName("selected")[0];
          var selectedImageNum = selectedImage.attributes['data-number'].value;
          var userText = document.getElementById("userText").value;
          var userURL = document.getElementById("userURL").value;

          var newUrl = "http://daynejones.com/hypnospace/" +
                       "?url=" + userURL + 
                       "&text=" + escape(userText) + 
                       "&img=" + selectedImageNum; 

          console.log(newUrl);

          window.location = newUrl;
          return false;
      }

      var toggleFormDisplay = function(){
          var form = document.getElementById("theForm");
          if (form.style.display == "none") {
              form.style.display = "block";
          } else {
              form.style.display = "none";
          }
      }

      var toggleIframeDisplay = function(){
          var iframe = document.getElementById("theFrame");
          if (iframe.style.display !== "block") {
              iframe.style.display = "block";
          } else {
              iframe.style.display = "none";
          }
      }

      var hideForm = function(){
          var form = document.getElementById('theForm');
          form.style.display = "none";
      }

      var bindFormImages = function(){
          var images = document.getElementsByClassName("select-gif");
          for (var i=0; i < images.length; i++){
              var img = images[i];   
              img.addEventListener('click', selectImage, false);
          }
      }

      var bindFormSubmit = function(){
          var submitButton = document.getElementById('submit');
          submit.addEventListener('click', formSubmit, false);
      }

      var init = function(){
          if (allQueryStringsPassed){
              console.log("all query strings passed");
              toggleFormDisplay();
              setupIframe();
              toggleIframeDisplay();
              startCreatingWindows();
          } else {
              console.log("all query strings not passed");
              bindFormImages();
              bindFormSubmit();
          }
      }

      return {
          init: init,
          settings: settings, // remove this later
          stopCreatingWindows: stopCreatingWindows
      }
  }());

  windowMaker.init();
}, false);
