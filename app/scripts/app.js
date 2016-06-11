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
      'ITEM_AUTHOR': 'Author',
      'ITEM_URL': 'URL',
      'ITEM_MARK': 'Mark',
      'ITEM_READING_NOW': 'Reading now',
      'ITEM_1_STAR': '1 star',
      'ITEM_2_STARS': '2 stars',
      'ITEM_3_STARS': '3 stars',
      'ITEM_FAVORITE': 'Favorite',
      'ITEM_WANT_TO_READ': 'Want to read',
      'ITEM_DONT_WANT_TO_READ': 'Don\'t want to read',
      'ITEM_DATE': 'Date',
      'ITEM_TAG': 'Tag',
      'ITEM_CLOSE': 'Close',
      'ITEM_SAVE_CHANGES': 'Save changes',
      'ITEM_REMOVE': 'Remove item',
      'ITEMS_EMPTY': 'Nothing to show in this list',
      'ITEM_NOT_EMPTY': 'Should be not empty',
      'ITEM_EXISTS': 'This item already exists',
      'DATE_UNDEFINED': 'some day or other...',
      'ITEMS_UNDEFINED': 'No items were read yet',
      'CONFIRM_QUESTION': 'Are you shure?',
      'EXTERNAL_LINK': 'read now...',
      'TAG_FICTION': 'Fiction',
      'TAG_EDUCATION': 'Education',
      'TAG_ENTERTAINMENT': 'Entertainment',
      'SEARCH_FOR': 'Search for...',
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'February'
    });

    $translateProvider.translations('ru', {
      'APP_TITLE': 'Основной фокус',
      'MENU_PROJECTS': 'Проекты',
      'MENU_TASKS': 'Задачи',
      'MENU_FOCUS': 'Фокус',
      'ITEM_TITLE': 'Название',
      'ITEM_AUTHOR': 'Автор',
      'ITEM_URL': 'Ссылка',
      'ITEM_MARK': 'Оценка',
      'ITEM_READING_NOW': 'Сейчас читаю',
      'ITEM_1_STAR': '1 звезда',
      'ITEM_2_STARS': '2 звезды',
      'ITEM_3_STARS': '3 звезды',
      'ITEM_FAVORITE': 'Любимая',
      'ITEM_WANT_TO_READ': 'Хочу прочитать',
      'ITEM_DONT_WANT_TO_READ': 'Не хочу читать',
      'ITEM_TAG': 'Метка',
      'ITEM_DATE': 'Дата',
      'ITEM_CLOSE': 'Закрыть',
      'ITEM_SAVE_CHANGES': 'Сохранить',
      'ITEM_REMOVE': 'Удалить книгу',
      'ITEMS_EMPTY': 'Нечего показывать в этом списке',
      'ITEM_NOT_EMPTY': 'Должно быть не пустым',
      'ITEM_EXISTS': 'Элемент с таким названием уже есть',
      'DATE_UNDEFINED': 'рано или поздно...',
      'ITEMS_UNDEFINED': 'Ни одной книги пока не прочитано',
      'CONFIRM_QUESTION': 'Вы уверены?',
      'EXTERNAL_LINK': 'прочитать...',
      'TAG_FICTION': 'Фантастика',
      'TAG_EDUCATION': 'Обучающая',
      'TAG_ENTERTAINMENT': 'Развлекательная',
      'SEARCH_FOR': 'Найти...',
      '01': 'Январь',
      '02': 'Февраль',
      '03': 'Март',
      '04': 'Апрель',
      '05': 'Май',
      '06': 'Июнь',
      '07': 'Июль',
      '08': 'Август',
      '09': 'Сентябрь',
      '10': 'Октябрь',
      '11': 'Ноябрь',
      '12': 'Февраль'
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
