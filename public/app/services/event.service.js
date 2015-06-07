angular
	.module('app')
	.factory('eventService', function($http) {
		
		return {
			getAllEvents: getAllEvents,
			getEvent: getEvent
		}
		
		var base = "/api/events/";
		
		function getAllEvents() {
			var url = base;
			var config = {
				'params': {
					'callback': 'JSON_CALLBACK'
				}
			};
			return $http.jsonp(url, config);
		}

		function getEvent(id) {
			var request = id;
			var url = base + request;
			var config = {
				'params': {
					'callback': 'JSON_CALLBACK'
				}
			};
			return $http.jsonp(url, config);
		}
	});