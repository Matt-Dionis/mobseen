angular.module('EventCtrl', []).controller('EventController', function($scope, Events) {

    // pull stadium details from API based on routeParams
    $scope.id = $routeParams.id;
    $scope.limit = 20;

    $scope.loadImages = function() {

        if ($scope.busy) return;
        $scope.busy = true;
        $scope.limit += 20;

        Events.get($scope.id,$scope.limit).success(function(response) {
            $scope.photos = response.photos.reverse();
            $scope.busy = false;
        });
    }

    Events.get($scope.id,$scope.limit).success(function(response) {
        $scope.photos = response.photos.reverse();
        $scope.event = response.event;
        $scope.headline = response.headline;
        $scope.city = response.city;
        $scope.state = response.state;
    });
});