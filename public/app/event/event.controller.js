/// <reference path="../../../typings/angularjs/angular.d.ts"/>

'use strict';

angular
  .module('app')
  .controller('EventController', EventController);

  EventController.$inject = ['$routeParams', 'eventService'];

  function EventController($routeParams, eventService) {
    var vm = this;

    var id = $routeParams.id;

    eventService.getEvent(id).success(function(response) {
      vm.photos = response.photos.reverse();
      vm.event = response.event;
      vm.headline = response.headline;
      vm.city = response.city;
      vm.state = response.state;
    });
  }
