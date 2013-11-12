'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile, fetchTracks)  {

		$scope.title = 'dscover.me';




})

// Create audio element
.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
})
.factory('fetchTracks', function($http) {
  return {
    recommendations: function(hypemUser) { return $http.get('http://gijwi.com:8080/recommendations?username=' + hypemUser)},
    mp3: function(hypemId) {return $http.get('http://gijwi.com:3001/mp3?hypemId=' + hypemId)}
  }
})


