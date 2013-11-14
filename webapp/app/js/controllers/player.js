'use strict';
angular.module('dscover.me')
.controller('PlayerCtrl', function ($scope, $rootScope, $http, fetchTracks, player) {

    $scope.player = player;
    fetchTracks.recommendations('rubehere').success(function(response) {
      $rootScope.tracks = response.tracks;
    })

})