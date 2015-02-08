angular.module('InstaFactory', []).factory('Instagram', function($http) {
	var base = 'https://api.instagram.com/v1/media/search?lat=';
	var client_id = '0a27cf17ae7047b8b12008dd5d2f38d5';

	return {
		'get': function(lat,lon,rad) {
			var url = base + lat + '&lng=' + lon + '&distance=' + rad + '&client_id=' + client_id;
			var config = {
				'params': {
					'callback': 'JSON_CALLBACK'
				}
			};
			return $http.jsonp(url, config);
		}
	};
});