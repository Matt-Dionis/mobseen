angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['eventService'];

function MainController(eventService) {

    var vm = this;

    eventService.getAllEvents().success(function(response) {
        console.log(response);
        vm.events = response;

        angular.forEach(vm.events, function(event){
        	event.start = new Date(event.start);
        	event.date = new Date(event.date);
        	event.end = new Date(event.end);
        });
    });
}