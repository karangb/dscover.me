'use strict';
angular.module('dscover.me')
.controller('PlayerCtrl', function ($scope, $rootScope, $http, fetchTracks, player, $cookieStore) {
  
    var lastUser = $cookieStore.get('loginUser');
    $scope.player = player;

    fetchTracks.recommendations(lastUser || 'rubehere').success(function(response) {
      $rootScope.tracks = response.tracks;
    })

})