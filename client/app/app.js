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
  'validation.match',
  'pascalprecht.translate'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
  .config(['$translateProvider', function($translateProvider) {
    'use strict';
    $translateProvider.translations('en', {
      'MENU_FOCUS': 'focus1',
      'MENU_PROJECTS': 'projects',
      'MENU_TASKS': 'tasks'
    });

    $translateProvider.translations('ru', {
      'MENU_FOCUS': 'фокус',
      'MENU_PROJECTS': 'проекты',
      'MENU_TASKS': 'задачи'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape'); // sanitize|escape
    $translateProvider.useCookieStorage();
    }]);
