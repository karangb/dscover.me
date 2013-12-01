'use strict';

angular.module('dscover.me')
  .factory('setLogin', function ($cookieStore) {
    var self = this;
    return {
      setUser: function() {
          $cookieStore.set('loginUser');
      },
      lastUser: function() {
          return $cookieStore.get('loginUser');
      },
      addUser: function(user) {
        $cookieStore.put('loginUser', user);
      }

    }
  });
