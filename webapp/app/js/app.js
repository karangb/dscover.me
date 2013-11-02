'use strict';
(function(window) {
angular.module('dscover.me', ['ngRoute','ngResource', 'ngAnimate', 'ui.slider', 'ui.bootstrap'])
  .config(['$routeProvider', function (routeProvider) {
    routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})(window);