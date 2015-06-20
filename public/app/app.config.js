'use strict';

angular
  .module('app')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })

    .when('/:id', {
      templateUrl: 'app/event/event.html',
      controller: 'EventController',
      controllerAs: 'event'
    });

    $locationProvider.html5Mode(true);
  });
