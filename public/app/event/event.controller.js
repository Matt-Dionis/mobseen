angular
    .module('app')
    .controller('EventController', EventController);

EventController.$inject = ['$routeParams', 'eventService'];

function EventController($routeParams, eventService) {

    var vm = this;

    // pull stadium details from API based on routeParams
    vm.id = $routeParams.id;
    vm.limit = 20;

    vm.loadImages = function() {

        if (vm.busy) return;
        vm.busy = true;
        vm.limit += 20;

        Events.get(vm.id,vm.limit).success(function(response) {
            vm.photos = response.photos.reverse();
            vm.busy = false;
        });
    }

    eventService.get(vm.id,vm.limit).success(function(response) {
        vm.photos = response.photos.reverse();
        vm.event = response.event;
        vm.headline = response.headline;
        vm.city = response.city;
        vm.state = response.state;
    });
}