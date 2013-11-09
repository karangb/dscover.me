'use strict';
angular.module('dscover.me')
.controller('LoginCtrl', function mainController ($scope, $modal, $http) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (modalName) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'modalController',
            resolve: {
                'items': function() { return $scope.items; }
            }
        });
        console.log('modal opened');
        modalInstance.result.then(function (response) {
            $scope.selected = response;
            console.log(response);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
})
.controller('modalController', function modalController ($scope, $http, $modalInstance, items, fetchUsername, getTracks) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
        console.log('ok');
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        console.log('cancel');
    };
    $scope.login = function(username) {
        fetchRecommendations(username).success( function(response) {
            $scope.tracks = response.tracks;
            getTracks($scope.tracks);
            $modalInstance.dismiss('cancel');

        })
        console.log(getUsername);
    };
})
.factory('getTracks', function() {
    return function(tracks) {
        return tracks;
    }
});