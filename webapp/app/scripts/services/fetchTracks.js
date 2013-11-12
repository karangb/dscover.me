'use strict';

angular.module('dscover.me')
  .factory('fetchTracks', function ($http) {
      return {
        recommendations: function(hypemUser) { return $http.get('http://gijwi.com:8080/recommendations?username=' + hypemUser)},
        mp3: function(hypemId) {return $http.get('http://gijwi.com:3001/mp3?hypemId=' + hypemId)}
      }
    });
