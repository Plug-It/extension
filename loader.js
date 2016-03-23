(function(){
  function $(selector){return document.querySelectorAll(selector);}
  function loadScript(URL) {
    // if not completely loaded, call again until loaded
    if (!$("#app-menu .list .logout div span").length) {
      if (typeof URL !== "undefined") setTimeout(function(){loadScript(URL)}, 200);
      else setTimeout(loadScript, 200);
    }
    else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (typeof URL !== "undefined") script.src = URL;
      else script.src = "https://rawgit.com/Plug-It/pi/master/ressources/pi.js";
      $("head")[0].appendChild(script);
    }
  }
  function autoReload() {
    // if not completely loaded, call again until loaded
    if (!$("#video").length) setTimeout(loadScript, 200);
    // Remove annoying video, we all have seen them enough
    if ($("#video").length) $(".content")[0].removeChild($("#video")[0]);
    if (!$(".loading-box").length) setTimeout(function(){location.reload();}, 60*1000);
  }

  // Retrieve options
  chrome.storage.sync.get({
    // Default settings
    enabled: true,
    autof5: true,
    custom_enabled: false,
    custom_URL: ""
  }, function(items) {
    if (items.enabled) loadScript();
    if (items.autof5) autoReload();
    if (items.custom_enabled) loadScript(items.custom_URL);
  });
})();
