'use strict';

angular.module('nextMainFocusApp.auth', ['nextMainFocusApp.constants', 'nextMainFocusApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
