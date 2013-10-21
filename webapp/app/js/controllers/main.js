'use strict';

angular.module('dscover.me')
.controller('MainCtrl', ['$scope', function (scope) {
		scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Bootstrap',
			'JQuery',
			'Karma'
		];

		scope.title = 'dscover.me';
}]);
