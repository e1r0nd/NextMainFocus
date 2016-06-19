'use strict';

angular.module('nextMainFocusApp', ['nextMainFocusApp.auth', 'nextMainFocusApp.admin',
    'nextMainFocusApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
