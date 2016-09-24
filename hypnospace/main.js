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
          IMAGES: IMAGES,
          BGIMAGES: BGIMAGES,
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
              //console.log("text not passed");
              return false;
          }
      }()

      var userImg = function(){
          if (URLParams.hasOwnProperty('img')) {
              return URLParams.img;
          } else {
              //console.log("img not passed");
              return false;
          }
      }()

      var userURL = function(){
          if (URLParams.hasOwnProperty('url')) {
              return URLParams.url;
          } else {
              //console.log("url not passed");
              return false;
          }
      }()

      var userBgImg = function(){
          if (URLParams.hasOwnProperty('bgimg')) {
              return URLParams.bgimg;
          } else {
              //console.log("bgimg not passed");
              return false;
          }
      }()

      var userFont = function(){
          if (URLParams.hasOwnProperty('font')) {
              return URLParams.font;
          } else {
              //console.log("font not passed");
              return false;
          }
      }()

      var userFontColor = function(){
          if (URLParams.hasOwnProperty('fontColor')) {
              return URLParams.fontColor;
          } else {
              //console.log("fontColor not passed");
              return false;
          }
      }()

      var userSound = function(){
          if (URLParams.hasOwnProperty('sound')) {
              return URLParams.sound;
          } else {
              //console.log("sound not passed");
              return false;
          }
      }()

      var allQueryStringsPassed = function(){
          return (userText && userImg && userURL && userBgImg && userFont && userFontColor && userSound);
      }()

      var createWindow = function(){
          // TODO: check for number of windows and delete some
          var browserWidth = document.documentElement.clientWidth;
          var browserHeight = document.documentElement.clientHeight;
          var c = document.createDocumentFragment()
          var div = document.createElement("div");
          var randInt = Math.floor(Math.random() * 40) + 1;

          div.className = "font-" + settings.FONTS[userFont];
          div.style.color = userFontColor;
          div.style.backgroundImage = "url('img/" + settings.BGIMAGES[userBgImg] + "')";
          div.innerHTML = '<img src="img/' + settings.IMAGES[userImg] + '">' +
                          '<marquee scrollamount="' + randInt + '">' +
                          '<a href="https://kickstarter.com/projects/jaytholen/hypnospace-outlaw">' + 
                          userText + '</a></marquee>';

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
          document.body.appendChild(c);
          var audio = new Audio('sound/' + SOUNDS[userSound]);
          audio.play();
      }
	  var randomnumber = Math.floor(Math.random() * (7000 - 1000 + 1)) + 1000;

      var startCreatingWindows = function(){
          settings.interval = setInterval(createWindow, randomnumber);
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

      var playSound = function(){
          var sound = this.parentElement.attributes['data-sound'].value;
          var audio = new Audio('sound/' + SOUNDS[sound]);
          audio.play();
      }

      var selectSound = function(){
          deselectSounds();
          var sound = this.parentElement.attributes['data-sound'].value;
          this.parentElement.className = "sound-container selected";
      }

      var deselectSounds = function(){
          console.log("HERE");
          var soundContainers = document.getElementsByClassName("sound-container");
          for (var i=0; i < soundContainers.length; i++){
              var container = soundContainers[i];   
              container.className = "sound-container";
          }
      }

      var setupSoundSelect = function(){
          var div = document.getElementById("selectSound");
          var HTML = '';
          for (var i=0; i < SOUNDS.length; i++){
              HTML = HTML + "<div class='sound-container " + (i == 0 ? "selected" : "" ) + 
                    "' data-sound='"+i+"'>Sound " + (i+1) + "<span class='play'>&#9658;</span>" + 
                    "<span class='select-sound'>&#10003</span></div>";
          }
          div.innerHTML = HTML;

          // adding event listeners
          var playButtons = document.getElementsByClassName("play");
          for (var i=0; i < playButtons.length; i++){
              var playButton = playButtons[i];   
              playButton.addEventListener('click', playSound, false);
          }

          var selectButtons = document.getElementsByClassName("select-sound");
          for (var i=0; i < selectButtons.length; i++){
              var selectButton = selectButtons[i];   
              selectButton.addEventListener('click', selectSound, false);
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
          var selectedSound = [].slice.call(document.getElementsByClassName("sound-container")).filter(checkSelect)[0];

          var selectedImageNum = selectedImage.attributes['data-number'].value;
          var selectedBgImageNum = selectedBgImage.attributes['data-number'].value;

          var selectedFontNum = document.getElementById("fontChoice").value;
          var selectedFontColor = document.getElementById("colorChoice").value;

          var selectedSoundNum = selectedSound.attributes['data-sound'].value;

          var userText = document.getElementById("userText").value;
          var userURL = document.getElementById("userURL").value;

          var newUrl = "file:///Users/daynejones/Developer/daynejones.github.io/hypnospace/index.html" +
                       "?url=" + userURL + 
                       "&text=" + escape(userText) + 
                       "&bgimg=" + selectedBgImageNum + 
                       "&font=" + selectedFontNum + 
                       "&fontColor=" + selectedFontColor + 
                       "&sound=" + selectedSoundNum + 
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

      var hideVideo = function(){
          var video = document.getElementById("theVideo");
          video.style.display = "none";
      }

      var clearBackground = function(){
          document.body.style.background = "none";
      }

      var init = function(){
          if (allQueryStringsPassed){
              //console.log("all query strings passed");
              toggleFormDisplay();
              hideVideo();
              clearBackground();
              setupIframe();
              toggleIframeDisplay();
              startCreatingWindows();
          } else {
              //console.log("not all query strings passed");
              setupSoundSelect();
              bindFormImages();
              bindFormSubmit();
          }
      }

      return {
          init: init,
          stopCreatingWindows: stopCreatingWindows
      }
  }());

  windowMaker.init();
}, false);
