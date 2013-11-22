// Global Variables
var scriptElement = document.getElementById( 'frozenCookieScript' ),
	baseUrl = scriptElement !== null ?
		scriptElement.getAttribute('src').replace(/\/frozen_cookies\.js$/, '') :
		'https://raw.github.com/enginekid92/FrozenCookies/master',
	FrozenCookies = {
		'baseUrl': baseUrl,
		'branch' : 'M',
		'version': 1.03934
	};

// Load external libraries
FrozenCookies.loadInterval = setInterval(function() {
  if (Game && Game.ready) {
    clearInterval(FrozenCookies.loadInterval);
    FrozenCookies.loadInterval = 0;
    fcInit();
  }
}, 1000);

function fcInit() {
  var done = 0,
    script_list = [
      'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js',
      'http://underscorejs.org/underscore-min.js',
      'http://calebevans.me/projects/jcanvas/resources/jcanvas/jcanvas.min.js',
      FrozenCookies.baseUrl + '/cc_upgrade_prerequisites.js',
      FrozenCookies.baseUrl + '/fc_main.js',
      FrozenCookies.baseUrl + '/fc_button.js'
    ],
    jquery = document.createElement('script');

  jquery.setAttribute('type', 'text/javascript');
  jquery.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
  jquery.onload = function() {
    script_list.forEach(function(url,id){
      $.getScript(url,function() {
        done++;
        if (done>=script_list.length)
        {
          setOverrides();
          FCStart();
        }
      });
    });
  };
  document.head.appendChild(jquery);
}
