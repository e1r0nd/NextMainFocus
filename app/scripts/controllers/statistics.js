/**************************************************
 * Next Main Focus // statistics.js
 * coded by Anatol Marezhanyi aka e1r0nd//[CRG] - June 2016
 * http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
 * Placed in public domain.
 **************************************************/
/*global angular, console*/
angular.module('nextmainfocusApp')
  .controller('StatisticsCtrl', function ($scope, $rootScope, $filter, localStorageService) {
    'use strict';
    var booksInStore = localStorageService.get('books');

    $scope.books = booksInStore || [];

    $scope.$root.$on('reloadBooks', function () {
      try {
        booksInStore = localStorageService.get('books');
        $scope.books = booksInStore || [];
        $scope.reIndex();
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    });

    $scope.reIndex = function () { //calculate books' statistics
      try {
        $scope.stats = {};
        $scope.filteredBooks = $filter('filter')($scope.books, function (item) {
          if (item.mark > 0 && item.mark < 5) {
            return true;
          }
          return false;
        });

        $scope.filteredBooks.forEach(function (book) {
          var year = book.date.split('-')[0],
            month = book.date.split('-')[1];

          if (!$scope.stats[year]) {
            $scope.stats[year] = {};
            $scope.stats[year].months = {};
            $scope.stats[year].books = [];
            $scope.stats[year].title = year;
          }
          if (!$scope.stats[year].months[month]) {
            $scope.stats[year].months[month] = [];
            $scope.stats[year].months[month].books = [];
            $scope.stats[year].months[month].title = month;
          }

          $scope.stats[year].books.push(book);
          $scope.stats[year].months[month].books.push(book);
        });

        $scope.stats = $filter('orderBy')($filter('object2Array')($scope.stats), 'year', false);
        var i;

        for (i in $scope.stats) { // reorder months
          if ($scope.stats.hasOwnProperty(i)) {
            $scope.stats[i].months = $filter('orderBy')($filter('object2Array')($scope.stats[i].months), 'title', false);
          }
        }
      } catch (e) {
        if (window.console && window.console.error) {
          console.error(e, e.stack);
        }
      }
    };
    $scope.reIndex(); //initial count
  });
