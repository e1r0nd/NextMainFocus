'use strict';

angular.module('nextMainFocusApp.auth', [
  'nextMainFocusApp.constants',
  'nextMainFocusApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
