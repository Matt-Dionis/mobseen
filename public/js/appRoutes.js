angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// insta page that will use the InstaController
		.when('/:id', {
			templateUrl: 'views/event.html',
			controller: 'EventController'
		});

	$locationProvider.html5Mode(true);

}]);