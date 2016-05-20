/**************************************************
 * Next Main Focus // app.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - May 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
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
      'MENU_FOCUS': 'focus',
      'MENU_PROJECTS': 'projects',
      'MENU_TASKS': 'tasks',
      'REMOVE': 'remove'
    });

    $translateProvider.translations('ru', {
      'MENU_FOCUS': 'фокус',
      'MENU_PROJECTS': 'проекты',
      'MENU_TASKS': 'задачи',
      'REMOVE': 'удалить'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape'); // sanitize|escape
    $translateProvider.useCookieStorage();
    }]);
