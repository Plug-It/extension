// ==UserScript==
// @name        Plug-It
// @namespace   WiBla (http://wibla.free.fr) <contact.wibla@gmail.com>
// @description Easily load Plug-It for Plug.dj.
// @icon        https://raw.githubusercontent.com/Plug-It/extension/master/icon128.png
// @include     *://plug.dj/*
// @include     *://*.plug.dj/*
// @exclude     *://*.plug.dj/_/*
// @exclude     *://*.plug.dj/@/*
// @exclude     *://*.plug.dj/!/*
// @exclude     *://*.plug.dj/about
// @exclude     *://*.plug.dj/ba
// @exclude     *://*.plug.dj/forgot-password
// @exclude     *://*.plug.dj/founders
// @exclude     *://*.plug.dj/giftsub/*
// @exclude     *://*.plug.dj/jobs
// @exclude     *://*.plug.dj/legal
// @exclude     *://*.plug.dj/merch
// @exclude     *://*.plug.dj/partners
// @exclude     *://*.plug.dj/plot
// @exclude     *://*.plug.dj/privacy
// @exclude     *://*.plug.dj/purchase
// @exclude     *://*.plug.dj/subscribe
// @exclude     *://*.plug.dj/team
// @exclude     *://*.plug.dj/terms
// @exclude     *://*.plug.dj/press
// @version     1.1.1
// @grant       none
// ==/UserScript==
(function() {
  function $(selector) {return document.querySelectorAll(selector);}
  function loadScript(URL) {
    // Check if DOM is ready
    if (!$('.loading-box.d-none').length || !$('.logout').length) {
      setTimeout(function(){loadScript();}, 200);
    } else {
      var script = document.createElement('script');
      script.id = 'pi-script';
      script.type = 'text/javascript';
      script.src = 'https://rawgit.com/Plug-It/pi/pre-release/js/pi.js';
      $('head')[0].appendChild(script);
    }
  }
  function autoReload() {
    // if not completely loaded, call again until loaded
    if (!$('#video').length && !$('.spinner').length) setTimeout(autoReload, 200);
    else if ($('#video').length) {
      setTimeout(function(){location.reload();}, 60*1000);
    }
  }
  loadScript();
  autoReload();
})();
