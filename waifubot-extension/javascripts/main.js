var WAIFUBOT_API_URL = 'http://localhost:5000'
var DISCORD_API_URL = 'https://discordapp.com/api/v6'

// Show error to user
function errorFunc(data) {
  alert(JSON.stringify(data));
}

function getNewProfilePic(email, token, cb) {
  $.get({
    'url': WAIFUBOT_API_URL + '/curpic', 
    'data': JSON.stringify({'email': email}),
    'success': function(data) {
      if (data.pic) {
        changeProfilePic(data.pic, data.token);
      } else {
        errorFunc(data);
      }
    }, 
    'error': errorFunc,
    'dataType': 'json',
    'contentType': 'application/json'
  });
}

function getToken(email, password) {
  $.post({
    'url': DISCORD_API_URL + '/auth/login', 
    'data': JSON.stringify({'email': email, 'password': password, 'undelete': false, 'captcha_key': null}),
    'success': function(data) {
      if (data.token) {
        getNewProfilePicInfo(data.email, data.token);
      } else {
        errorFunc(data);
      }
    }, 
    'error': errorFunc,
    'dataType': 'json',
    'contentType': 'application/json'
  });
}

browser.storage.local.get('userinfo', function(items) {
  if (items.userinfo == null) {
    browser.tabs.create({'url': '/html/signup.html'});
    alert('Please Sign Up');
  } else {

  }
});