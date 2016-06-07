/**************************************************
 * Personal Bookshelf // menu.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - January 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
/*global $, angular, console*/
angular.module('personalbookshelfApp')
  .controller('MenuCtrl', function ($scope, $rootScope, $filter, localStorageService, $translate, $routeParams) {
    'use strict';
    var booksInStore = localStorageService.get('books'),
      searchMatch = function (haystack, needle) {
        // check fields for input queries
        try {
          if (!needle) {
            return true;
          }
          return haystack.toLowerCase()
            .indexOf(needle.toLowerCase()) !== -1;
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      };

    $scope.books = booksInStore || [];
    $scope.language = $translate.use();
    $scope.params = $routeParams;

    $scope.$on('reloadBooks', function () {
      // reindex lists on a book's changing
      try {
        booksInStore = localStorageService.get('books');
        $scope.books = booksInStore || [];
        $scope.search();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    });

    $scope.changeLanguage = function (langKey) {
      // init translations
      try {
        $translate.use(langKey);
        $scope.language = $translate.use();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.topmenu = [
      {
        name: 'MENU_WISHLIST',
        value: '5',
        icon: 'list'
            },
      {
        name: 'MENU_READ',
        value: '0',
        icon: 'book'
            },
      {
        name: 'MENU_FAVORITES',
        value: '4',
        icon: 'star'
            },
      {
        name: 'MENU_DONE',
        value: '1',
        icon: 'ok'
            },
      {
        name: 'MENU_BLAMELIST',
        value: '6',
        icon: 'ban-circle'
            }
    ];

    // init filters
    $scope.filters = '5';
    $scope.type = '';
    $scope.tags = {
      'fiction': false,
      'education': false,
      'entertainment': false
    };

    $scope.search = function () {
      // init the filtered books
      try {
        $rootScope.filteredItems = $filter('filter')($scope.books, function (item) {
          if (($scope.filters === item.mark) ||
            ('1' === $scope.filters && item.mark > 0 && item.mark < 4) ||
            ('-1' === $scope.filters && searchMatch(item.title, $scope.query))
          ) {
            if ($scope.type && item.type !== $scope.type) {
              return false;
            }
            if ((!$scope.tags.fiction && !$scope.tags.education && !$scope.tags.entertainment) ||
              ($scope.tags.fiction && 'fiction' === item.tag) ||
              ($scope.tags.education && 'education' === item.tag) ||
              ($scope.tags.entertainment && 'entertainment' === item.tag)) {
              return true;
            } else {
              return false;
            }
            return true;
          }
          return false;
        });
        if ('5' === $scope.filters) { //reorder books for the Wish-list
          $rootScope.filteredItems = $filter('orderBy')($rootScope.filteredItems, 'order');
        } else {
          $rootScope.filteredItems = $filter('orderBy')($rootScope.filteredItems, 'date');
        }
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.search(); //do an initial filtering on start

    $scope.toggleFilters = function (value) {
      // select current filter
      try {
        $scope.filters = value;
        $scope.search();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.toggleTag = function (value) {
      // toggle a filtering by tags
      try {
        $scope.tags[value] = !$scope.tags[value];
        $scope.search();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.selectType = function (value) {
      // select a range
      try {
        $scope.type = value;
        $scope.search();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $rootScope.global = { //the global Search filter
      search: ''
    };

    $scope.toggleSearch = function (isBack) {
      try {
        $scope.menuDiv.toggle();
        $scope.searchDiv.toggle(); //display the Search field
        if (!isBack) {
          $scope.oldFilter = $scope.filters; //store the current filter's value
          $scope.filters = '-1'; //drop all filters
          $scope.searchInp.focus();
        } else {
          $scope.filters = $scope.oldFilter; //restore the previous filter
          $scope.clearSearch();
        }
        $scope.search();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };

    $scope.clearSearch = function () { //clear the global Search filter
      $scope.searchInp.val('');
      $rootScope.global.search = '';
      $scope.search();
    };

    $('document')
      .ready(function () { //init only after rendering
        $scope.menuDiv = $('#menuDiv');
        $scope.searchDiv = $('#searchDiv');
        $scope.searchInp = $('#searchInp');

        try {
          $.material.init();
        } catch (e) {
          if (window.console && window.console.error) {
            console.error(e, e.stack);
          }
        }
      });

  });
