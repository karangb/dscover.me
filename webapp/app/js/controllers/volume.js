'use strict';
angular.module('dscover.me')
.controller('VolumeCtrl', function volumeController ($scope, $http, audio) {
   
   $scope.muted = false;
    $scope.volumes = {
      default: 0.5,
      options: {
        orientation: 'vertical',
        min: 0.00,
        max: 1.00,
        step: 0.1,
        range: 'min',
        change: setVolume,  
        slide: setVolume
      }
    };

    // Mute Button
    $scope.muteVolume = function() {
      if($scope.muted === true) {
        $scope.muted = false;
        $scope.volumes.default = 0.5;
      } else {
        audio.volume = 0;
        $scope.volumes.default = 0.00;
        $scope.muted = true;
      }
    }

     // Listen for Volume
    function setVolume () {
      if($scope.volumes.default === 0) {
        $scope.muted = true
      } else {
      audio.volume = $scope.volumes.default;
      }
    }

})
