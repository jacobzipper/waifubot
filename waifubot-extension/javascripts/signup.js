var DISCORD_API_URL = 'https://discordapp.com/api/v6'

// Show error to user
function errorFunc(data) {
  alert(JSON.stringify(data));
}

$(function() {
  function submitForm(e) {
    var email = document.getElementById('discEmail').value;
    var password = document.getElementById('discPassword').value;
    $.post({
      'url': DISCORD_API_URL + '/auth/login', 
      'data': JSON.stringify({'email': email, 'password': password, 'undelete': false, 'captcha_key': null}),
      'success': function(data) {
        if (data.token) {
          browser.storage.local.set({'userinfo': {
            'email': email,
            'password': password
          }})
          .then(function(item) {
            alert('Success!');
            browser.tabs.getCurrent()
            .then(function(tab) {
              browser.tabs.remove(tab.id);
            }, errorFunc);
          }, errorFunc);
        } else {
          alert(JSON.stringify(data));
        }
      }, 
      'error': errorFunc,
      'dataType': 'json',
      'contentType': 'application/json'
    });
    return false;
  }

  document.querySelector('form').addEventListener('submit', submitForm);
});