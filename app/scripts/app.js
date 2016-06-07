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
      .when('/view/:view/all', {
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl',
        controllerAs: 'statistics'
      })
      .otherwise({
        redirectTo: '/view/books'
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
      'MENU_READ': 'Read',
      'MENU_FAVORITES': 'Favorites',
      'MENU_DONE': 'Done',
      'MENU_WISHLIST': 'Wishlist',
      'MENU_BLAMELIST': 'Blamelist',
      'MENU_STATISTICS': 'Statistics',
      'MENU_LANGUAGE': 'Language',
      'BOOK_TITLE': 'Title',
      'BOOK_AUTHOR': 'Author',
      'BOOK_URL': 'URL',
      'BOOK_MARK': 'Mark',
      'BOOK_READING_NOW': 'Reading now',
      'BOOK_1_STAR': '1 star',
      'BOOK_2_STARS': '2 stars',
      'BOOK_3_STARS': '3 stars',
      'BOOK_FAVORITE': 'Favorite',
      'BOOK_WANT_TO_READ': 'Want to read',
      'BOOK_DONT_WANT_TO_READ': 'Don\'t want to read',
      'BOOK_DATE': 'Date',
      'BOOK_TAG': 'Tag',
      'BOOK_CLOSE': 'Close',
      'BOOK_SAVE_CHANGES': 'Save changes',
      'BOOK_REMOVE': 'Remove book',
      'BOOKS_EMPTY': 'Nothing to show in this list',
      'BOOK_NOT_EMPTY': 'Should be not empty',
      'BOOK_EXISTS': 'This book already exists',
      'DATE_UNDEFINED': 'some day or other...',
      'BOOKS_UNDEFINED': 'No books were read yet',
      'CONFIRM_QUESTION': 'Are you shure?',
      'EXTERNAL_LINK': 'read now...',
      'SHOW_ALL': 'Show all',
      'SHOW_BOOKS': 'Show books',
      'SHOW_ARTICLES': 'Show articles',
      'SHOW_FICTION': 'Show Fiction',
      'SHOW_EDUCATION': 'Show Education',
      'SHOW_ENTERTAINMENT': 'Show Entertainment',
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
      'APP_TITLE': 'Следующая цель',
      'MENU_READ': 'Читаю',
      'MENU_FAVORITES': 'Любимые',
      'MENU_DONE': 'Прочитал',
      'MENU_WISHLIST': 'Хочу',
      'MENU_BLAMELIST': 'Не хочу',
      'MENU_STATISTICS': 'Статистика',
      'MENU_LANGUAGE': 'Язык',
      'BOOK_TITLE': 'Название',
      'BOOK_AUTHOR': 'Автор',
      'BOOK_URL': 'Ссылка',
      'BOOK_MARK': 'Оценка',
      'BOOK_READING_NOW': 'Сейчас читаю',
      'BOOK_1_STAR': '1 звезда',
      'BOOK_2_STARS': '2 звезды',
      'BOOK_3_STARS': '3 звезды',
      'BOOK_FAVORITE': 'Любимая',
      'BOOK_WANT_TO_READ': 'Хочу прочитать',
      'BOOK_DONT_WANT_TO_READ': 'Не хочу читать',
      'BOOK_TAG': 'Метка',
      'BOOK_DATE': 'Дата',
      'BOOK_CLOSE': 'Закрыть',
      'BOOK_SAVE_CHANGES': 'Сохранить',
      'BOOK_REMOVE': 'Удалить книгу',
      'BOOKS_EMPTY': 'Нечего показывать в этом списке',
      'BOOK_NOT_EMPTY': 'Должно быть не пустым',
      'BOOK_EXISTS': 'Книга с таким названием уже есть',
      'DATE_UNDEFINED': 'рано или поздно...',
      'BOOKS_UNDEFINED': 'Ни одной книги пока не прочитано',
      'CONFIRM_QUESTION': 'Вы уверены?',
      'EXTERNAL_LINK': 'прочитать...',
      'SHOW_ALL': 'Показать все',
      'SHOW_BOOKS': 'Показать книги',
      'SHOW_ARTICLES': 'Показать статьи',
      'SHOW_FICTION': 'Показать Фантастику',
      'SHOW_EDUCATION': 'Показать Обучающие',
      'SHOW_ENTERTAINMENT': 'Показать Развлекательные',
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
