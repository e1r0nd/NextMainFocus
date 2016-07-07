'use strict';

angular.module('nextmainfocusApp', ['nextmainfocusApp.auth', 'nextmainfocusApp.admin',
    'nextmainfocusApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
    $('document').ready(()=> {
      $.material.init();
    });
  });
