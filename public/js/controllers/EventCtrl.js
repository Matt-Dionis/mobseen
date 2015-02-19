angular.module('EventCtrl', []).controller('EventController', function($scope, $routeParams, $sce, socket, Events, Instagram) {

    // pull stadium details from API based on routeParams
    $scope.id = $routeParams.id;
    $scope.limit = 20;

    /* $scope.testId = 123456;
    $scope.coords = {
        latitude: 33.5275926,
        longitude: -112.2626006
    };

    $scope.map = {
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 17
    };

    $scope.tweets = []; */

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

        /* $scope.map = {
            center: {
                latitude: response.latitude,
                longitude: response.longitude
            },
            zoom: 17
        };

        $scope.options = {
            scrollwheel: false,
            mapTypeId: "satellite",
            disableDefaultUI: true
        };

        if (new Date(response.start) < new Date() && new Date(response.end) > new Date()) {
            Instagram.get(response.latitude,response.longitude,response.radius).success(function(response) {
                $scope.shots = response.data;
            });
        } */
    });

    /* socket.on('newTweets', function(tweetInfo) {
        $scope.tweets.unshift(tweetInfo);
    }); */
});