'use strict';

angular.module('nextmainfocusApp', ['nextmainfocusApp.auth', 'nextmainfocusApp.admin',
    'nextmainfocusApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match', 'pascalprecht.translate'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
    $('document').ready(()=> {
      $.material.init();
    });
  })
  .config(['$translateProvider', function($translateProvider) {
    'use strict';
    $translateProvider.useStaticFilesLoader({
      prefix: '/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape'); // sanitize|escape
    $translateProvider.useCookieStorage();
  }]);
