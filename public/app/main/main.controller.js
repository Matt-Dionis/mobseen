angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['eventService'];

function MainController(eventService) {

    var vm = this;

    // pull empty event details from API based on routeParams to get all events
    vm.id = '';

    eventService.get(vm.id).success(function(response) {
        console.log(response);
        vm.events = response;

        angular.forEach(vm.events, function(event){
        	event.start = new Date(event.start);
        	event.date = new Date(event.date);
        	event.end = new Date(event.end);
        });
    });
}