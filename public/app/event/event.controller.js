angular
    .module('app')
    .controller('EventController', EventController);

EventController.$inject = ['$routeParams', 'eventService'];

function EventController($routeParams, eventService) {

    var vm = this;

    // pull stadium details from API based on routeParams
    var id = $routeParams.id;

    eventService.getEvent(id).success(function(response) {
        vm.photos = response.photos.reverse();
        vm.event = response.event;
        vm.headline = response.headline;
        vm.city = response.city;
        vm.state = response.state;
    });
}