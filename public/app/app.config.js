angular
	.module('app')
	.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'main/main.html',
		controller: 'MainController',
		controllerAs: 'main'
	})

	.when('/:id', {
		templateUrl: 'event/event.html',
		controller: 'EventController',
		controllerAs: 'event'
	});

	$locationProvider.html5Mode(true);
})