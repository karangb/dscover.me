'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile, fetchTracks, setLogin)  {
		$scope.title = 'dscover.me';
})

// Create audio element
.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
})

