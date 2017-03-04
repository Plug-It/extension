function save_options() {
  var enabled = document.getElementById('enabled').checked;
  var reload = document.getElementById('reload').checked;
  var hide_video = document.getElementById('hide-video').checked;
  var custom_enabled = document.getElementById('custom-enabled').checked;
  var scripts = [];
  var custom_code = document.getElementById('custom-code').value;

  var urls = document.querySelectorAll('.url');
  for (var i = 0; i < urls.length; i++) {
    var shouldLoad = document.getElementById(i+1).checked;
    var url = urls[i].value;
    scripts.push([shouldLoad, url]);
  }
  chrome.storage.sync.set({
    enabled: enabled,
    autof5: reload,
    hideVideo: hide_video,
    custom_enabled: custom_enabled,
    scripts: scripts,
    custom_code: custom_code
  }, function() {
    // Update save button to let user know options were saved.
    var button = document.getElementById('save');
    button.textContent = 'Options saved !';
    button.className = 'saved';
    window.uInt = setTimeout(function(){
      button.textContent = 'Save';
      button.className = '';
    }, 2000);
  });
}
function restore_options() {
  // Default values
  chrome.storage.sync.get({
    enabled: true,
    autof5: true,
    hideVideo: true,
    custom_enabled: false,
    scripts: [],
    custom_code: ''
  }, function(items) {
    document.getElementById('enabled').checked = items.enabled;
    document.getElementById('reload').checked = items.autof5;
    document.getElementById('hide-video').checked = items.hideVideo;
    document.getElementById('custom-enabled').checked = items.custom_enabled;
    var url = document.querySelectorAll('.url');
    for (var i = 0; i < items.scripts.length; i++) {
      if (url.length < items.scripts.length) document.getElementById('add').click();
      document.getElementById(i+1).checked = items.scripts[i][0];
      url[i].value = items.scripts[i][1];

      var url = document.querySelectorAll('.url');
    }

    document.getElementById('custom-code').value = items.custom_code;
  });
}
function addUrlInput(e) {
  let button = e.currentTarget;
  let index = document.querySelectorAll('.url').length+1;

  // Creating elements
  var div = document.createElement('div');
      div.className = 'row';
  var inputCheck = document.createElement('input');
      inputCheck.type = 'checkbox';
      inputCheck.id = index;
  var label = document.createElement('label');
      label.setAttribute('for', index);
  var inputURL = document.createElement('input');
      inputURL.type = 'text';
      inputURL.className = 'url';
      inputURL.placeholder = '*.js (must be https)';
      inputURL.tabIndex = index;
      inputURL.autocomplete = 'off';
      inputURL.autocorrect = 'off';
  var rmvButton = document.createElement('button');
      rmvButton.addEventListener('click', function() {
        // button.row.body.remove(this)
        button.parentNode.parentNode.removeChild(div);
      });

  // Creating the whole thing
  div.appendChild(inputCheck);
  div.appendChild(label);
  div.appendChild(inputURL);
  div.appendChild(rmvButton);

  // similar to $(button).after()
  var after = document.getElementById('custom-code');
  button.parentNode.parentNode.insertBefore(div, after);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', function(e) {
  if (e.target.className === 'saved') {
    clearTimeout(uInt);
    e.target.textContent = 'Save';
    e.target.className = '';
  } else {
    save_options();
  }
});
document.getElementById('add').addEventListener('click', function(e){addUrlInput(e);});
