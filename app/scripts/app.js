/**************************************************
 * NextMainFocus // app.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - June 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
/*global angular*/
angular
  .module('nextmainfocusApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule',
        'pascalprecht.translate',
        'ng-sortable'
    ])
  .config(function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/view/:view', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/view/items'
      });
  })
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    'use strict';
    localStorageServiceProvider.setPrefix('nmf');
    }])
  .config(['$translateProvider', function ($translateProvider) {
    'use strict';
    $translateProvider.translations('en', {
      'APP_TITLE': 'Next Main Focus',
      'MENU_PROJECTS': 'Projects',
      'MENU_TASKS': 'Tasks',
      'MENU_FOCUS': 'Focus',
      'ITEM_TITLE': 'Title',
      'ITEM_ACRONYM': 'Acronym',
      'ITEM_DATE': 'Date',
      'ITEM_PARENTID': 'Project',
      'ITEM_CLOSE': 'Close',
      'ITEM_SAVE_CHANGES': 'Save changes',
      'ITEM_REMOVE': 'Remove item',
      'ITEMS_EMPTY': 'Nothing to show in this list',
      'ITEM_NOT_EMPTY': 'Should be not empty',
      'CONFIRM_QUESTION': 'Are you shure?',
      'SEARCH_FOR': 'Search for...',
    });

    $translateProvider.translations('ru', {
      'APP_TITLE': 'Основной фокус',
      'MENU_PROJECTS': 'Проекты',
      'MENU_TASKS': 'Задачи',
      'MENU_FOCUS': 'Фокус',
      'ITEM_TITLE': 'Название',
      'ITEM_ACRONYM': 'Акроним',
      'ITEM_PARENTID': 'Проект',
      'ITEM_DATE': 'Дата',
      'ITEM_CLOSE': 'Закрыть',
      'ITEM_SAVE_CHANGES': 'Сохранить',
      'ITEM_REMOVE': 'Удалить элемент',
      'ITEMS_EMPTY': 'Нечего показывать в этом списке',
      'ITEM_NOT_EMPTY': 'Должно быть не пустым',
      'CONFIRM_QUESTION': 'Вы уверены?',
      'SEARCH_FOR': 'Найти...',
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape'); // sanitize|escape
    $translateProvider.useCookieStorage();
    }])
  .filter('object2Array', function () { //convert an object to an array as you see
    'use strict';
    return function (input) {
      var out = [],
        i;
      for (i in input) {
        if (input.hasOwnProperty(i)) {
          out.push(input[i]);
        }
      }
      return out;
    };
  })
  .filter('asDate', function () {
    'use strict';
    return function (input) {
      return new Date(input);
    };
  });
