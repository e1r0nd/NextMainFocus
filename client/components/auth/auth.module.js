'use strict';

angular.module('nextmainfocusApp.auth', ['nextmainfocusApp.constants', 'nextmainfocusApp.util',
    'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
