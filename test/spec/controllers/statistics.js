/*global describe, beforeEach, module, inject*/
describe('Controller: StatisticsCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('personalbookshelfApp'));

  var StatisticsCtrl,
    scope,
    rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatisticsCtrl = $controller('StatisticsCtrl', {
      $scope: scope
        // place here mocked dependencies
    });
  }));
  beforeEach(inject(function ($rootScope) {
    rootScope = $rootScope.$new();
  }));

  it('reIndex: broadcast ', function () {
    scope.books = [{
      title: 'b1',
      mark: '1',
      date: '2000-02-15'
      }, {
      title: 'b2',
      mark: '1',
      date: '2000-02-15'
      }, {
      title: 'b3',
      mark: '1',
      date: '2001-01-01'
      }];
    scope.reIndex();
    // console.log('filteredBooks: ');
    // console.debug(scope.filteredBooks);
    // console.log('stats: ');
    // console.debug(scope.stats);
    // console.log(scope.stats[0]);
    expect(scope.stats[0].books.length)
      .toBe(2);
  });
});
