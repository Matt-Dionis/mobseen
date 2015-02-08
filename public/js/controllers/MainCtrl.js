angular.module('MainCtrl', []).controller('MainController', function($scope, $routeParams, Events) {

    // pull empty event details from API based on routeParams to get all events
    $scope.id = '';

    Events.get($scope.id).success(function(response) {
        console.log(response);
        $scope.events = response;

        angular.forEach($scope.events, function(event){
        	event.start = new Date(event.start);
        	event.date = new Date(event.date);
        	event.end = new Date(event.end);
        });
    });
});