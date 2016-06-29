/**************************************************
 * Next Main Focus // menu.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - June 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
/*global $, angular, console*/
angular.module('nextmainfocusApp')
  .controller('MenuCtrl', function ($scope, $rootScope, $filter, localStorageService, $translate, $routeParams) {
    'use strict';
    var itemsInStore = localStorageService.get('items'),
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

    $scope.items = itemsInStore || [];
    $scope.language = $translate.use();
    $scope.params = $routeParams;

    $scope.$on('reloadItems', function () {
      // reindex lists on a item's changing
      try {
        itemsInStore = localStorageService.get('items');
        $scope.items = itemsInStore || [];
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
        name: 'MENU_FOCUS',
        value: 'focus',
        icon: 'all_out'
            },
      {
        name: 'MENU_PROJECTS',
        value: 'project',
        icon: 'folder'
            },
      {
        name: 'MENU_TASKS',
        value: 'task',
        icon: 'list'
            }
    ];

    // init filters
    $scope.filters = 'focus';

    $scope.search = function () {
      // init the filtered items
      try {
        $rootScope.filteredItems = $filter('filter')($scope.items, function (item) {
          if (($scope.filters === item.type) ||
            ('focus' === $scope.filters && '0' === item.order && 'task' === item.type) ||
            ('' === $scope.filters && searchMatch(item.title, $scope.query))
          ) {
            return true;
          }
          return false;
        });

        if ('focus' !== $scope.filters) { //reorder items for the Wish-list
          $rootScope.filteredItems = $filter('orderBy')($rootScope.filteredItems, 'order');
        } else {
          $rootScope.filteredItems = $filter('orderBy')($rootScope.filteredItems, 'date');
        }

        $rootScope.projectItems = $filter('filter')($scope.items, function (item) {
          if ('project' === item.type) {
            return true;
          }
          return false;
        });
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

    $rootScope.global = { //the global Search filter
      search: ''
    };

    $scope.toggleSearch = function (isBack) {
      try {
        $scope.menuDiv.toggle();
        $scope.searchDiv.toggle(); //display the Search field
        if (!isBack) {
          $scope.oldFilter = $scope.filters; //store the current filter's value
          $scope.filters = ''; //drop all filters
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
