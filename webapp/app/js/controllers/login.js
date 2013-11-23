'use strict';
angular.module('dscover.me')
.controller('LoginCtrl', function ($rootScope, $scope, $modal, $http, $cookieStore) {

        $rootScope.loginName = function() {
                $rootScope.lastUser = $cookieStore.get('loginUser');
                var lastUser = $rootScope.lastUser;
                return lastUser || "Login";
        };  

    $scope.open = function (modalName) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'modalController',
            resolve: {
                'items': function() { return $scope.items; }
            }
        });
        console.log('modal opened');
    };
})
.controller('modalController', function ($scope, $rootScope, $http, $modalInstance, fetchTracks, player, audio, $cookieStore) {

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
            audio.pause();
            player.play();
            $modalInstance.dismiss('cancel');
            $rootScope.lastVal = $cookieStore.put('loginUser', hypemUser);;

        })

    };
})