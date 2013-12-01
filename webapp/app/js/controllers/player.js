'use strict';
angular.module('dscover.me')
.controller('PlayerCtrl', function ($scope, $rootScope, $http, fetchTracks, player, setLogin) {
  
    var lastUser = setLogin.lastUser();
    $scope.player = player;

    fetchTracks.recommendations(lastUser || 'rubehere').success(function(response) {
      $rootScope.tracks = response.tracks;
    })

})