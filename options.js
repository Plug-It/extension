// Saves options to chrome.storage.sync.
function save_options() {
  var enabled = document.getElementById('enabled').checked;
  var reload =  document.getElementById('reload').checked;
  var custom_enabled =  document.getElementById('custom-enabled').checked;
  var custom_URL =  document.getElementById('URL').value;
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value enabled and autof5 = true.
  chrome.storage.sync.get({
    enabled: true,
    autof5: true,
    custom_enabled: false,
    custom_URL: ".js URL (https) separated by comas"
  }, function(items) {
    document.getElementById('enabled').checked = items.enabled;
    document.getElementById('reload').checked = items.autof5;
    document.getElementById('custom-enabled').checked = items.custom_enabled;
    document.getElementById('URL').value = items.custom_URL;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
