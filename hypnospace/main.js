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

function ValidURL(str) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(str);
}

document.addEventListener('DOMContentLoaded', function(){ 
  window.windowMaker = (function(){
      var settings = {'windowHeight': 398, 'windowWidth': 548,
          IMAGES: {1: '1.gif', 2: '2.gif'},
          BGIMAGES: {1: 'bg-1.gif', 2: 'bg-2.gif', 3: 'bg-3.gif', 4: 'bg-4.gif'},
          windowNoise: new Audio("bongo-flute.mp3"),
          FONTS: {0: "comic", 1: "times", 2: "arial", 3: "impact"}
      }

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

      var userBgImg = function(){
          if (URLParams.hasOwnProperty('bgimg')) {
              return URLParams.bgimg;
          } else {
              return false;
          }
      }()

      var userFont = function(){
          if (URLParams.hasOwnProperty('font')) {
              return URLParams.font;
          } else {
              return false;
          }
      }()

      var userFontColor = function(){
          if (URLParams.hasOwnProperty('fontColor')) {
              return URLParams.fontColor;
          } else {
              return false;
          }
      }()

      var allQueryStringsPassed = function(){
          return (userText && userImg && userURL && userBgImg && userFont && userFontColor);
      }()

      var createWindow = function(){
          // TODO: check for number of windows and delete some
          var browserWidth = document.documentElement.clientWidth;
          var browserHeight = document.documentElement.clientHeight;
          var c = document.createDocumentFragment()
          var div = document.createElement("div");
          var randInt = Math.floor(Math.random() * 30) + 1;

          div.className = "font-" + settings.FONTS[userFont];
          div.style.color = userFontColor;
          div.style.backgroundImage = "url('img/" + settings.BGIMAGES[userBgImg] + "')";
          div.innerHTML = '<marquee scrollamount="' + randInt + '">' + 
                          '<a href="https://kickstarter.com/projects/jaytholen/hypnospace-outlaw">' + 
                          userText + '</a></marquee>' +
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
            if (Math.floor(Math.random() * 10) + 1 > 6) {
              createWindow();
            } else {
              this.parentElement.remove()
            }
          }, false);

          div.appendChild(check);
          div.appendChild(close);

          div.className = div.className + " window";
          div.style.left = Math.floor(Math.random() * (browserWidth - settings.windowWidth)) + "px";
          div.style.top = Math.floor(Math.random() * (browserHeight - settings.windowHeight)) + "px";

          c.appendChild(div);
          settings.windowNoise.play();
          document.body.appendChild(c);
      }

      var startCreatingWindows = function(){
          settings.interval = setInterval(createWindow, '3000');
      }

      var stopCreatingWindows = function(){
          clearInterval(settings.interval);
      }

      var selectImage = function(ele){
          deselectImages(ele);
          if (ele.target.className.indexOf("select-gif") !== -1){
            this.className = "select-gif selected";
          } else {
            this.className = "select-bg-gif selected";
          }
      }

      var deselectImages = function(ele){
          var className, images;
          // deselects all images of the same type
          if (ele.target.className.indexOf("select-gif") !== -1){
            images = document.getElementsByClassName("select-gif");
            className = "select-gif";
          } else {
            images = document.getElementsByClassName("select-bg-gif");
            className = "select-bg-gif";
          }
          for (var i=0; i < images.length; i++){
              var img = images[i];   
              img.className = className;
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

      var validateForm = function(){
          var urlInput = document.getElementById("userURL");
          var textInput = document.getElementById("userText");
          if (!urlInput.value.trim()) {
              alert("Please enter a URL!");
              return false;
          } else if (!ValidURL(urlInput.value)){
              alert("Please enter a valid URL!");
              return false;
          }
          if (!textInput.value.trim()) {
              alert("Please enter some text!");
              return false;
          }
          return true;
      }

      var formSubmit = function(evt){
          evt.preventDefault();
          if (!validateForm()) return false;
          var checkSelect = function(ele){return ele.className.indexOf("selected") !== -1};
          var selectedImage = [].slice.call(document.getElementsByClassName("select-gif")).filter(checkSelect)[0];
          var selectedBgImage = [].slice.call(document.getElementsByClassName("select-bg-gif")).filter(checkSelect)[0];

          var selectedImageNum = selectedImage.attributes['data-number'].value;
          var selectedBgImageNum = selectedBgImage.attributes['data-number'].value;

          var selectedFontNum = document.getElementById("fontChoice").value;
          var selectedFontColor = document.getElementById("colorChoice").value;

          var userText = document.getElementById("userText").value;
          var userURL = document.getElementById("userURL").value;

          var newUrl = "http://daynejones.com/hypnospace/" +
                       "?url=" + userURL + 
                       "&text=" + escape(userText) + 
                       "&bgimg=" + selectedBgImageNum + 
                       "&font=" + selectedFontNum + 
                       "&fontColor=" + selectedFontColor + 
                       "&img=" + selectedImageNum; 

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
          // background images
          var images = document.getElementsByClassName("select-bg-gif");
          for (var i=0; i < images.length; i++){
              var img = images[i];   
              img.addEventListener('click', selectImage, false);
          }

          // body images
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
