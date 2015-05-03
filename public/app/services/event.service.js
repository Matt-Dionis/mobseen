angular
	.module('app')
	.factory('eventService', function($http) {
		var base = "/api/events/";

		return {
			'get': function(id,limit) {
				var request = id;
				var limit = limit;
				var url = base + request + '?limit=' + limit;
				var config = {
					'params': {
						'callback': 'JSON_CALLBACK'
					}
				};
				return $http.jsonp(url, config);
			}
		};
	});