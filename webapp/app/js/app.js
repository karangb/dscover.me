'use strict';

angular.module('dscover.me', ['ngRoute','ngResource', 'ngAnimate', 'ui.slider', 'ui.bootstrap', 'ngCookies'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'PlayerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
