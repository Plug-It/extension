function save_options() {
  var enabled = document.getElementById('enabled').checked;
  var reload = document.getElementById('reload').checked;
  var custom_enabled = document.getElementById('custom-enabled').checked;
  var custom_URL = [];

  var urls = document.querySelectorAll('.url');
  for (var i = 0; i < urls.length; i++) {
    custom_URL.push(urls[i].value);
  }
  chrome.storage.sync.set({
    enabled: enabled,
    autof5: reload,
    custom_enabled: custom_enabled,
    custom_URL: custom_URL
  }, function() {
    // Update save button to let user know options were saved.
    var button = document.getElementById('save');
    button.textContent = 'Options saved !';
    setTimeout(function(){button.textContent = 'Save';}, 2000);
  });
}
function restore_options() {
  // Default values
  chrome.storage.sync.get({
    enabled: true,
    autof5: true,
    custom_enabled: false,
    custom_URL: [""]
  }, function(items) {
    document.getElementById('enabled').checked = items.enabled;
    document.getElementById('reload').checked = items.autof5;
    document.getElementById('custom-enabled').checked = items.custom_enabled;
    var urls = document.querySelectorAll('.url');
    while (urls.length < items.custom_URL.length) {
      var lastBtn = document.querySelectorAll('.add-input');
      lastBtn = lastBtn[lastBtn.length-1];

      lastBtn.click();
      urls = document.querySelectorAll('.url');
    }
    
    for (var i = 0; i < urls.length; i++) {
      urls[i].value = items.custom_URL[i];
    }
  });
}
function addUrlInput(e) {
  var button = e.currentTarget;

  // Creating elements
  var br = document.createElement('br');
  var input = document.createElement('input');
      input.type = 'text';
      input.className = 'url';
      input.tabIndex = document.querySelectorAll('.url').length+1;
  var buttonAdd = document.createElement('button');
      buttonAdd.className = 'add-input';
      buttonAdd.textContent = '+';
      buttonAdd.addEventListener('click', function(e){addUrlInput(e);});
  var buttonRmv = document.createElement('button');
      buttonRmv.className = 'rmv-input';
      buttonRmv.textContent = '-';
      buttonRmv.addEventListener('click', function(e){rmvUrlInput(e);});

  // similar to $(button).after()
  var after = document.getElementById('save');
  button.parentNode.insertBefore(br, after);
  button.parentNode.insertBefore(input, after);
  button.parentNode.insertBefore(buttonAdd, after);
  button.parentNode.insertBefore(buttonRmv, after);
}
function rmvUrlInput(e) {
  var button = e.currentTarget;
  var parent = button.parentNode;
  parent.removeChild(button.previousElementSibling.previousElementSibling.previousElementSibling); // br
  parent.removeChild(button.previousElementSibling.previousElementSibling); // input
  parent.removeChild(button.previousElementSibling); // button.add-input
  parent.removeChild(button);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.querySelector('.add-input').addEventListener('click', function(e){addUrlInput(e);});
