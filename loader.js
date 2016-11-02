(function(){
  // Thanks RəAnna !
  window.Intercom = {}, window.amplitude = { __VERSION__: true };

  function $(selector) {return document.querySelectorAll(selector);}
  function loadScript(URL, code) {
    // Check if DOM is ready
    if ($('.loading-box').length || $('.spinner').length || !$('.logout').length) {
      setTimeout(function(){loadScript(URL, code);}, 200);
    } else {
      var script = document.createElement('script');
      if (URL === null && typeof code === 'string') {
        script.className = 'pi-custom-script';
        script.type = 'text/javascript';
        script.innerHTML = code;
        $('head')[0].appendChild(script);
      } else {
        typeof URL == 'undefined' ? script.id = 'pi-script' : script.className = 'pi-custom-script';
        script.type = 'text/javascript';
        typeof URL !== 'undefined' ? script.src = URL : script.src = 'https://rawgit.com/Plug-It/pi/pre-release/ressources/pi.js';
        $('head')[0].appendChild(script);
      }
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

  // Retrieve options
  chrome.storage.sync.get({
    // Default settings
    enabled: true,
    autof5: true,
    custom_enabled: false,
    scripts: [],
    custom_code: ''
  }, function(items) {
    if (items.enabled) loadScript();
    if (items.autof5) autoReload();
    if (items.custom_enabled) {
      var scripts = items.scripts;
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i][0] && scripts[i][1].length) loadScript(scripts[i][1]);
      }
    }
    if (items.custom_code.length) loadScript(null, items.custom_code);
  });
})();
