// ==UserScript==
// @name        Plug-It
// @namespace   WiBla (http://wibla.free.fr) <contact.wibla@gmail.com>
// @description Easily load Plug-It for Plug.dj.
// @icon        https://raw.githubusercontent.com/Plug-It/extension/master/icon128.png
// @include     https://plug.dj/*
// @exclude     https://plug.dj/dashboard
// @exclude     https://plug.dj/about
// @exclude     https://plug.dj/press
// @exclude     https://plug.dj/ba
// @exclude     https://plug.dj/terms
// @exclude     https://plug.dj/privacy
// @exclude     https://plug.dj/subscribe
// @exclude     https://plug.dj/plot
// @exclude     https://plug.dj/_/*
// @exclude     https://plug.dj/@/*
// @version     1.0.1
// @grant       none
// ==/UserScript==
(function() {
  function $(selector) {return document.querySelectorAll(selector);}
  function loadScript(URL) {
    // Check if DOM is ready
    if ($('.loading-box').length || $('.spinner').length || !$('.logout').length) {
      setTimeout(function(){loadScript();}, 200);
    } else {
      var script = document.createElement('script');
      script.id = 'pi-script';
      script.type = 'text/javascript';
      script.src = 'https://rawgit.com/Plug-It/pi/pre-release/ressources/pi.js';
      $('head')[0].appendChild(script);
    }
  }
  function autoReload() {
    // if not completely loaded, call again until loaded
    if (!$('#video').length && !$('.spinner').length) setTimeout(autoReload, 200);
    else if ($('#video').length) {
      // Remove annoying video, we all have seen them enough
      $('.content')[0].removeChild($('#video')[0]);
      setTimeout(function(){location.reload();}, 60*1000);
    }
  }
  loadScript();
  autoReload();
})();
