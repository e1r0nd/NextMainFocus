'use strict';

angular.module('nextMainFocusApp', [
  'nextMainFocusApp.auth',
  'nextMainFocusApp.admin',
  'nextMainFocusApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
