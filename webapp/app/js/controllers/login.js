'use strict';
angular.module('dscover.me')
.controller('LoginCtrl', function ($scope, $modal, $http ) {
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
.controller('modalController', function ($scope, $rootScope, $http, $modalInstance, items, fetchTracks) {

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
    $scope.login = function(hypemUser) {
        fetchTracks.recommendations(hypemUser).success( function(response) {
            $rootScope.tracks = response.tracks;
            $modalInstance.dismiss('cancel');
        })
    };
})